import { Component, OnInit } from '@angular/core';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  
  title = 'Power BI Embedded POC';

  ngOnInit() {
    //this.getReports();
  }

  getReports() {
    const config = {
      type: 'report',  
      accessToken: 'eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLW5vcnRoLWNlbnRyYWwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D',  
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=eeabdcd3-5f4e-40d3-ba20-ca977171765a&autoAuth=true&ctid=de9231de-45f4-4325-ae07-8ae72052517e&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLW5vcnRoLWNlbnRyYWwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D',  
      id: 'e342eb39-4897-4fc8-ae3c-9685e45ae689',  
      settings: {}
    };

    // Grab the reference to the div HTML element that will host the report.
    const reportsContainer = <HTMLElement>document.getElementById(
      'reportsContainer'
    );

    // Embed the report and display it within the div container.
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    const report = powerbi.embed(
      reportsContainer,
      config
    );

    // Report.off removes a given event handler if it exists.
    report.off('loaded');
    // Report.on will add an event handler which prints to Log window.
    report.on('loaded', function() {
      console.log('Loaded');
    });

    report.off('pageChanged');
    report.on('pageChanged', e => {
      console.log(e);
    });

    report.on('error', function(event) {
      console.log(event.detail);
      report.off('error');
  });
  }
}
