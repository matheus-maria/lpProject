import { Output, EventEmitter, Injectable } from '@angular/core';

export interface IWindow extends Window {
   webkitSpeechRecognition: any
   SpeechRecognition: any
}

@Injectable({
   providedIn: 'root'
})
export default class VoiceRecognition {

   recognition: any
   @Output() Onresult = new EventEmitter()

   constructor(){

      // Voice Object
      const { webkitSpeechRecognition } : IWindow = <IWindow>window;
      this.recognition  = new webkitSpeechRecognition() || new SpeechRecognition();

      // Voice Configurations
      this.recognition.interimResults = true
      this.recognition.lang = "pt-BR"
      this.recognition.continuous = true;      
      this.recognition.onresult = this._onResult
      this.recognition.onerror = this.onError
      this.recognition.onend = this.onEnd
      
   }

   start = (): void => this.recognition.start()   

   stop = (): void => this.recognition.stop()
   
   onError = (event: any): void => console.log(`Error: ${JSON.stringify(event)}`)   

   onEnd = (): void => { 
      console.log('Restarting...')
      this.recognition.start()
   }

   private _onResult = (event: any): void => {

      let interim_transcript = ''
      let final_transcript = ''

      for (let i = event.resultIndex; i < event.results.length; ++i) {
         if (event.results[i].isFinal)
            final_transcript += event.results[i][0].transcript
         else
            interim_transcript += event.results[i][0].transcript
      }

      let values = {
         Interim : interim_transcript,
         Final: final_transcript    
      }

      this.Onresult.emit(JSON.stringify(values))            
   }

}