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
  constructor(private petService: PetService) { }
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: CustomChartOptions;


  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    const list = this.petService.list as PetDetails[];
    if (list.length === 0) {
      return;
    }
    const speciesCounts = this.countSpecies(list);
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
                  `Totaal<br/><strong>${list.length}</strong>`, 0
                ).css({
                  color: '#000',
                  textAnchor: 'middle'
                }).add();
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
        name: 'Totaal',
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
