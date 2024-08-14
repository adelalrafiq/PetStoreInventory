import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { PetDetails } from '../../models/petDetails';
import { PetService } from '../../services/pet.service';


interface CustomChartOptions extends Highcharts.Options {
  chart: Highcharts.ChartOptions & {
    custom?: {
      label?: Highcharts.SVGElement
    }
  };
  series?: Highcharts.SeriesPieOptions[];
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chart: Highcharts.Chart | undefined;
  chartOptions!: CustomChartOptions;
  pets: PetDetails[] = [];

  constructor(private petService: PetService) { }


  ngOnInit(): void {
    this.petService.filteredList$.subscribe(pets => {
      this.pets = pets
      this.loadChartData();
    })
  }

  loadChartData(): void {
    if (!this.pets || this.pets.length === 0) {
      this.chartOptions = {
        chart: { type: 'pie' },
        title: { text: 'No data available' },
        series: []
      };
      if (this.chart) {
        this.chart.update(this.chartOptions, true, true);
      } else {
        this.chart = Highcharts.chart('container', this.chartOptions);
      }
      return;
    }

    const speciesCounts = this.countSpecies(this.pets);
    const petsLength = this.pets.length;
    this.chartOptions = {
      chart: {
        type: 'pie',
        custom: {},
        events: {
          render() {
            const chart = this as Highcharts.Chart & { options: CustomChartOptions },
              series = chart.series[0];
            if (!chart.options || !chart.options.chart) {
              return;
            }
            if (!chart.options.chart.custom) {
              chart.options.chart.custom = {}
            }
            let customLabel = chart.options.chart.custom.label;
            if (!customLabel) {
              customLabel = chart.options.chart.custom.label =
                chart.renderer.label(
                  `Totaal<br/><strong>${petsLength}</strong>`, 0
                ).css({
                  color: '#000',
                  textAnchor: 'middle'
                }).add();
            } else {
              customLabel.attr({
                text: `Totaal<br/><strong>${petsLength}</strong>`
              });
            }

            const x = series.center[0] + chart.plotLeft;
            const labelHeight = Number(customLabel.attr('height')) || 0;
            const y = series.center[1] + chart.plotTop - labelHeight;

            customLabel.attr({
              x,
              y
            });
            customLabel.css({
              fontSize: `${series.center[2] / 12}px`
            });
          }
        }
      },
      title: {
        text: 'Grafische weergave van de voorraad van diverse diersoorten.'
      },
      tooltip: {
        pointFormat: '<b>{series.name}: {point.y}</b>'
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderRadius: 8,
          innerSize: '60%',
          dataLabels: {
            enabled: true,
            distance: -27,
            format: '{point.percentage:.0f}%',
            style: {
              fontSize: '1.2em',
              color: '#fff'
            }
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Aantal',
        colorByPoint: true,
        type: 'pie',
        data: Object.entries(speciesCounts).map(([name, y]) => ({
          name,
          y,
        }))
      } as Highcharts.SeriesPieOptions]
    };
  }

  countSpecies(list: PetDetails[]): { [key: string]: number } {
    const speciesCounts: { [key: string]: number } = {};
    list.forEach(pet => {
      if (speciesCounts[pet.diersoort]) {
        speciesCounts[pet.diersoort]++;
      } else {
        speciesCounts[pet.diersoort] = 1;
      }
    });
    return speciesCounts;
  }
}
