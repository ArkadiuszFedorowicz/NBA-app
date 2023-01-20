import { Component } from '@angular/core';
import { NbaStatsService } from '../nba-stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  public firstSelectedTeam: any = '';
  public secondSelectedTeam: any = '';
  private firstSelectedTeamIndex: number = 1;
  private secondSelectedTeamIndex: number = 1;

  constructor(public nbaStatsService: NbaStatsService) {}

  onChange(item: string) {
    console.log(item);
    this.firstSelectedTeam = item;
    this.foundFirstTeamIndex(item);
    this.foundSecondTeamIndex(item);
    // this.foundFirstTeamIndex();

    console.log(this.nbaStatsService.data);
  }
  public ngOnInit(): void {}

  public foundFirstTeamIndex(item: any): any {
    this.firstSelectedTeamIndex = this.nbaStatsService.nbaTeamsList.findIndex(
      (obj) => obj.toString() === item
    );
    this.firstSelectedTeamIndex++;
    console.log(this.firstSelectedTeamIndex);
  }

  public foundSecondTeamIndex(item: any): any {
    this.secondSelectedTeamIndex = this.nbaStatsService.nbaTeamsList.findIndex(
      (obj) => obj.toString() === item
    );
    this.secondSelectedTeamIndex++;
    console.log(this.secondSelectedTeamIndex);
  }

  public findH2HMatches(): void {
    console.log(this.firstSelectedTeamIndex, this.secondSelectedTeamIndex);
    this.nbaStatsService.getH2HScores(
      'games',
      'h2h',
      this.firstSelectedTeamIndex,
      this.secondSelectedTeamIndex
    );
    console.log(this.sortData());
  }

  get sortData() {
    return this.nbaStatsService.data.response.sort(
      (
        a: { date: { start: string | number | Date } },
        b: { date: { start: string | number | Date } }
      ) => {
        return <any>new Date(b.date.start) - <any>new Date(a.date.start);
      }
    );
  }
}
