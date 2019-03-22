import { Component, OnInit } from '@angular/core';
import VoiceRecognition from './voice.service';

@Component({
  selector: 'lp-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private recognizer: VoiceRecognition) { }

  text: string = ''

  ngOnInit() {
    console.log('Voice Recognition Init')
    this.recognizer.start()    
    this.recognizer.Onresult.subscribe(this.voiceResult)
  }
  
  voiceResult = (value: any) => {    
  
    let content = JSON.parse(value)

    console.log(content)

    if(content.Final != ''){
      this.text += content.Final + ' ' + content.Interim + ' '
      document.getElementById('texto').innerHTML = this.text
    }
  }

}
