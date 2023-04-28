import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  NzI18nService,
  NzI18nInterface,
  en_GB,
  es_ES,
  gl_ES,
} from 'ng-zorro-antd/i18n';

interface MenuItem {
  title: string;
  link?: string;
  icon?: string;
  children?: MenuItem[];
  open?: boolean;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  isCollapsed = false;
  locale: string = '';

  languages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Galego', value: 'gl' },
  ];

  menus: MenuItem[] = [
    {
      title: 'SIDEBAR.INIT.TITLE',
      icon: 'bi bi-house',
      link: '/dashboard/home'
    },
    {
      title: 'SIDEBAR.CLINIC.TITLE',
      icon: 'bi bi-h-square',
      children: [
        {
          title: 'SIDEBAR.CLINIC.CLIENTS.TITLE',
          link: '/dashboard/clients',
          icon: 'fa-solid fa-paw'
        }
      ]
    },
    {
      title: 'SIDEBAR.INVENTORY.TITLE',
      icon: 'bi bi-box2-heart',
      children: [
        {
          title: 'SIDEBAR.INVENTORY.PRODUCTS.TITLE',
          link: '/dashboard/inventory/products',
          icon: 'bi bi-boxes'
        },
        {
          title: 'SIDEBAR.INVENTORY.PROVIDERS.TITLE',
          link: '/dashboard/inventory/providers',
          icon: 'bi bi-boxes'
        }
      ]
    },
    {
      title: 'SIDEBAR.CONFIGURATION.TITLE',
      icon: 'bi bi-gear',
      link: '/dashboard/configuration'
    },
  ];

  constructor(
    public translationService: NzI18nService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.locale = localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : 'es';
    this.switchLanguage();
  }

  switchLanguage() {
    let localeConfig: NzI18nInterface;
    if (this.locale == 'gl') {
      localeConfig = gl_ES;
    } else if (this.locale == 'en') {
      localeConfig = en_GB;
    } else {
      localeConfig = es_ES;
    }

    this.translationService.setLocale(localeConfig);
    this.translateService.setDefaultLang(this.locale);
    localStorage.setItem('lang', this.locale);
  }
}
