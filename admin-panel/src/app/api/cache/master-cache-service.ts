import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, lastValueFrom } from "rxjs";
import { ProvinciaService } from "../services/provincia.service";
import { LocalidadService } from "../services/localidad.service";
import { Provincia } from "../models/provincia";
import { Localidad } from "../models/localidad";



@Injectable({
    providedIn: 'root'
})
export class MasterCacheService {
    private lock = false;
    private interval;
    private pendingProvince = new BehaviorSubject(null);
    private pendingLocality = new BehaviorSubject(null);

    constructor(private provinciaService: ProvinciaService,
      private localidadService: LocalidadService
    ) {
    }

    getCacheAndUpdate(key: string, resultsFunction: Observable<any>, expirationDays = 1): Promise<any> {
        return new Promise<any>(resolve => {
            const cachedData = localStorage.getItem(key);
            let cacheData;
            let request = false;
            if (cachedData) {
                // The info is in the cache
                const parsedData = JSON.parse(cachedData);
                if (new Date() > new Date(parsedData['expirationDate'])) {
                    // The data is old, we will return what we have but we are going to refresh de cache
                    request = true;
                }
                cacheData = parsedData['content'];
            } else {
                // No data in cache... we have to get it
                request = true;
            }
            if (request) {
                // We have to get the data, to update the cache or to return it
                const subscription = resultsFunction.subscribe(results => {
                    if (results) {
                        const exDate = new Date();
                        exDate.setDate(exDate.getDate() + expirationDays);
                        localStorage.setItem(key, JSON.stringify({
                            content: results,
                            expirationDate: exDate.toISOString()
                        }));
                        if (!cacheData) {
                            // That is the first time because we don't have the data in the cache, so we have to resolve it now
                            resolve(results);
                        }
                        subscription.unsubscribe();
                    }
                });

            }
            if (cacheData) {
                // We have parsedData from cache, let's return it
                resolve(cacheData)
            }
        });

    }

    getLocalidades() {
        return this.getCacheAndUpdate('localidades', this.localidadService.findAllPagingLocalities({filtro: '', pagina: '0', pageSize: '99999'}));
    }

    getProvincias() {
        return this.getCacheAndUpdate('provincias', this.provinciaService.findAllPagingProvince({filtro: '', pagina: '0', pageSize: '99999'}));
    }



    storeItemToSend(key, itemData) {
        const cachedData = localStorage.getItem(key);
        let parsedData;
        if (cachedData) {
            parsedData = JSON.parse(cachedData);
        } else {
            parsedData = [];
        }
        parsedData.push(itemData)
        localStorage.setItem(key, JSON.stringify(parsedData));
    }


    /**
     * Envia la provincia al backend
     * @param item
     * @returns
     */
    sendNewProvince(item) {
        return lastValueFrom(this.provinciaService.saveProvince({ body: item }));
    }

    /**
     * Envia la localidad al backend
     * @param item
     * @returns
     */
    sendNewLocality(item) {
        return lastValueFrom(this.localidadService.saveLocality({ body: item }));
    }


    /**
     * Almacena una provincia para ser enviada
     * @param itemData
     */
    async newProvince(itemData: Provincia) {
        this.storeItemToSend('newProvince', itemData);
        this.syncPending();

    }

    /**
     * Almacena una localidad para ser enviada
     * @param itemData
     */
    async newLocality(itemData: Localidad) {
        this.storeItemToSend('newLocality', itemData);
        this.syncPending();

    }


   /**
    * Obtiene los registros pendientes de provincias
    * @returns pending element
    */
    getPendingProvince() {
        this.checkPending();
        return this.pendingProvince;
    }

     /**
    * Obtiene los registros pendientes de localidades
    * @returns pending element
    */
    getPendingLocality() {
        this.checkPending();
        return this.pendingProvince;
    }





    async syncPending() {
        const sendMethods = {
            newProvince : (item) => this.sendNewProvince(item),
            newLocality: (item) => this.sendNewLocality(item),


        };
        const pendingObservable = {
          newProvince: this.pendingProvince,
          newLocality: this.pendingLocality,
        };

        if (!this.lock) {
            this.lock = true;
            try {
                for (const key of [ 'newProvince', 'newLocality']) {
                    const cachedData = localStorage.getItem(key);
                    if (cachedData) {
                        const parsedData = JSON.parse(cachedData);
                        const pending = [...parsedData];
                        pendingObservable[key].next(pending.length);
                        for (const item of parsedData) {
                            try {
                                await sendMethods[key](item);
                                pending.shift();
                                if (pending.length > 0) {
                                    localStorage.setItem(key, JSON.stringify(pending)); // Update array in case of loss
                                } else {
                                    localStorage.removeItem(key);
                                }
                            } catch (e) {
                                console.log('No se puede enviar', item)
                            }
                        }

                    } else {
                        pendingObservable[key].next(0);
                    }
                }
            } catch (e) {
                console.error(e)
            }
            this.lock = false;
            // release lock
        }
    }



    checkPending() {
        if (!this.interval) {
            this.syncPending();
            this.interval = setInterval(() => this.syncPending(), 10 * 1000);
        }
    }
}
