import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from "rxjs";

// import {Alarma} from "../components/my-alarm/my-alarm.component";  // Importa CryptoJS

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  secretKey = 'Principios solidos de seguridad';  // Clave secreta para cifrar y descifrar
  encoder = new TextEncoder();
  decoder = new TextDecoder();

  constructor() { }

  // Cifrar dato
  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  // Descifrar dato
  decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Guardar dato en localStorage (cifrado)
  async setEncryptedItem(key: string, value: { password: string; email: string }): Promise<void> {
    const encryptedEmail = this.encrypt(value.email);
    const encryptedPass = this.encrypt(value.password);
    const encryptedData = JSON.stringify({ 'email': encryptedEmail, 'pass': encryptedPass });
    localStorage.setItem(key, encryptedData);
  }

  // Obtener respuesta si se tiene el dato en el localStorage
  hasLocalStorageItem(key: string): boolean {
    const item = localStorage.getItem(key);
    return item !== null;
  }

  // Obtener dato desde localStorage (descifrado)
  async getDecryptedItem(key: string): Promise<{ email: string, password: string } | null> {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) {
      return null;
    }
    const { email, pass } = JSON.parse(encryptedData);
    const decryptedEmail = this.decrypt(email);
    const decryptedPass = this.decrypt(pass);
    return { email: decryptedEmail, password: decryptedPass };
  }

  // Eliminar un item de localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clear(): void {
    localStorage.clear();
  }
}

export let DataAlarm: User[] = [
  {
    alarm: 'A001',
    Description: 'Primera alarma',
    Date: new Date(),
    Time: {
      Hour: 8,
      Minute: 30
    },
    Priority: 1,
    Voice: 0,
    Tone: 1,
    selected: false
  },
  {
    alarm: 'A002',
    Description: 'Segunda alarma',
    Date: new Date(),
    Time: {
      Hour: 9,
      Minute: 45
    },
    Priority: 2,
    Voice: 0,
    Tone: 2,
    selected: false
  },
  {
    alarm: 'A003',
    Description: 'Tercera alarma',
    Date: new Date(),
    Time: {
      Hour: 10,
      Minute: 15
    },
    Priority: 3,
    Voice: 0,
    Tone: 1,
    selected: false
  }
];

export let Priority: Option[] = [
  { value: 1, viewValue: 'High' },
  { value: 2, viewValue: 'Medium' },
  { value: 3, viewValue: 'Low' }
]

export let Voice: Option[] = [
  { value: 0, viewValue: 'Voz-1'},
  { value: 1, viewValue: 'Voz-2'},
  { value: 2, viewValue: 'Voz-3'}
]

export let Tone: Option[] = [
  { value: 0, viewValue: 'Tone-1'},
  { value: 1, viewValue: 'Tone-2'},
  { value: 2, viewValue: 'Tone-3'}
]

export class ActionService {
  private initialData: Action[] = [
    {letter: 'H', Activity: 'Actividad 1', selected: false},
    {letter: 'H', Activity: 'Actividad 2', selected: true},
    {letter: 'M', Activity: 'Actividad 3', selected: true},
    {letter: 'M', Activity: 'Actividad 4', selected: false},
    {letter: 'L', Activity: 'Actividad 5', selected: true},
    {letter: 'L', Activity: 'Actividad 6', selected: false}
  ];

  private dataSubject = new BehaviorSubject<Action[]>(this.initialData);
  data$ = this.dataSubject.asObservable();

  // Obtener los datos actuales
  getData(): Action[] {
    return this.dataSubject.getValue();
  }
}

export class DataAlarmService {
  private initialData: User[] = [
    {
      alarm: 'A001',
      Description: 'Primera alarma',
      Date: new Date(),
      Time: {
        Hour: 8,
        Minute: 30
      },
      Priority: 1,
      Voice: 0,
      Tone: 1,
      selected: false
    },
    {
      alarm: 'A002',
      Description: 'Segunda alarma',
      Date: new Date(),
      Time: {
        Hour: 9,
        Minute: 45
      },
      Priority: 2,
      Voice: 0,
      Tone: 2,
      selected: false
    },
    {
      alarm: 'A003',
      Description: 'Tercera alarma',
      Date: new Date(),
      Time: {
        Hour: 10,
        Minute: 15
      },
      Priority: 3,
      Voice: 0,
      Tone: 1,
      selected: false
    }
  ];

  private dataSubject = new BehaviorSubject<User[]>(this.loadDataFromSession() || this.initialData);
  data$ = this.dataSubject.asObservable();

  // Obtener los datos actuales
  getData(): User[] {
    return this.dataSubject.getValue();
  }

  // Actualizar un dato existente por índice
  updateAlarm(updatedAlarm: User, index: number): void {
    const data = this.getData();
    data[index] = updatedAlarm;  // Actualizar el objeto en la posición indicada
    this.dataSubject.next([...data]);  // Emitir la lista actualizada
    this.saveDataToSession();  // Guardar los datos actualizados en sessionStorage
  }

  // Añadir un nuevo dato
  addAlarm(newAlarm: User): void {
    const data = this.getData();
    data.push(newAlarm);  // Agregar a la lista
    this.dataSubject.next([...data]);  // Emitir la lista actualizada
    this.saveDataToSession();  // Guardar los datos actualizados en sessionStorage
  }

  // Eliminar un dato por índice
  removeAlarm(index: number): void {
    const data = this.getData();
    data.splice(index, 1);  // Eliminar el dato en la posición indicada
    this.dataSubject.next([...data]);  // Emitir la lista actualizada
    this.saveDataToSession();  // Guardar los datos actualizados en sessionStorage
  }

  // Guardar los datos en sessionStorage
  saveDataToSession(): void {
    sessionStorage.setItem('alarms', JSON.stringify(this.getData()));
  }

  // Cargar los datos desde sessionStorage
  private loadDataFromSession(): User[] | null {
    const savedAlarms = sessionStorage.getItem('alarms');
    return savedAlarms ? JSON.parse(savedAlarms) : null;
  }
}

export interface User {
  alarm: string;
  Description: string;
  Date: Date;
  Time: Time;
  Priority: number;
  Voice: number;
  Tone: number;
  selected: boolean;
}

export interface Time {
  Hour: number;
  Minute: number;
}

export interface Option {
  value: number;
  viewValue: string;
}

export interface Action {
  letter: string;
  Activity: string;
  selected: boolean;
}
