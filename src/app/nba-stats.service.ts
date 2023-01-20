import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiKeyService } from './api-key.service';
import { GameSummary } from './stats/game-summary';

@Injectable({
  providedIn: 'root',
})
export class NbaStatsService {
  httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': this.apiKeyService.apiKey,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    }),
  };

  public data: any;
  public gameSummary: GameSummary = new GameSummary(1, 1, 1, 1, 1, '');
  public firstTeamWins: number = 0;
  public secondTeamWins: number = 0;
  public firstTeamId: number = 0;
  public secondTeamId: number = 0;
  public firstTeamPointsSum: number = 0;
  public secondTeamPointsSum: number = 0;

  public nbaTeamsList: string[] = [
    'Atlanta Hawks',
    'Boston Celtics',
    'Charlotte Bobcats',
    'Brooklyn Nets',
    'Charlotte Hornets',
    'Chicago Bulls',
    'Cleveland Cavaliers',
    'Dallas Mavericks',
    'Denver Nuggets',
    'Detroit Pistons',
    'Golden State Warriors',
    'Lack of data',
    'Lack of data',
    'Houston Rockets',
    'Indiana Pacers',
    'LA Clippers',
    'LA Lakers',
    'Lack of data',
    'Memphis Grizzlies',
    'Miami Heat',
    'Milwaukee Bucks',
    'Minnesota Timberwolves',
    'New Orleans Pelicans',
    'New York Knicks',
    'Oklahoma City Thunder',
    'Orlando Magic',
    'Philadelphia 76ers',
    'Phoenix Suns',
    'Portland Trail Blazers',
    'Sacramento Kings',
    'San Antonio Spurs',
  ];

  public category: string = 'games';
  public parameter: string = 'games';

  constructor(private http: HttpClient, private apiKeyService: ApiKeyService) {}

  public getH2HScores(
    category: string,
    parameter: string,
    firstTeam: number,
    secondTeam: number
  ) {
    this.firstTeamId = firstTeam;
    this.secondTeamId = secondTeam;
    console.log(category, parameter, firstTeam, secondTeam);
    this.http
      .get(
        `https://api-nba-v1.p.rapidapi.com/${category}?${parameter}=${firstTeam}-${secondTeam}`,
        this.httpOptions
      )
      .subscribe((response) => {
        this.data = response;
        console.log(this.data.response);
        this.prepareGameSummary(firstTeam, secondTeam);
      });
  }

  public clearData(): void {
    this.firstTeamWins = 0;
    this.secondTeamWins = 0;
  }

  public ngOnInit(): void {
    console.log(this.data.response[1].teams.home);
  }

  public countWins(firstTeamId: number, secondTeamId: number): void {
    this.clearData();
   
    this.data.response.forEach((element: any) => {
      console.log(element.scores.home.points);
      if (element.teams.visitors.id == firstTeamId) {
        
        if (element.scores.visitors.points > element.scores.home.points) {
          this.firstTeamWins++;
          this.firstTeamPointsSum += element.scores.visitors.points;
          this.secondTeamPointsSum += element.scores.home.points;
        }
        else if (element.scores.visitors.points < element.scores.home.points) {
          this.secondTeamWins++;
          this.firstTeamPointsSum += element.scores.visitors.points;
          this.secondTeamPointsSum += element.scores.home.points;
          
          console.log("else if pierwszzy" + this.secondTeamPointsSum );
        }
      }


      if (element.teams.home.id == firstTeamId) {
        if (element.scores.home.points > element.scores.visitors.points) {
          this.firstTeamPointsSum += element.scores.home.points;
          this.secondTeamPointsSum += element.scores.visitors.points;
          console.log(this.firstTeamPointsSum);
          this.firstTeamWins++;
        }
        else if(element.scores.home.points < element.scores.visitors.points) {
          this.secondTeamWins++;
          this.firstTeamPointsSum += element.scores.home.points;
          this.secondTeamPointsSum += element.scores.visitors.points;
          console.log(this.secondTeamPointsSum + 'else if drugi');
        }
      }
    });

    console.log(this.firstTeamPointsSum);
 
    this.firstTeamPointsSum = Math.ceil(this.firstTeamPointsSum / (this.secondTeamWins + this.firstTeamWins) *10) / 10;
    this.secondTeamPointsSum = Math.ceil(this.secondTeamPointsSum / (this.secondTeamWins + this.firstTeamWins) *10) / 10;

    console.log(this.firstTeamPointsSum / (this.secondTeamWins + this.firstTeamWins));
    console.log(Math.ceil(this.firstTeamPointsSum / (this.secondTeamWins + this.firstTeamWins) *10) / 10);
    console.log(this.firstTeamPointsSum);
  }

  

  public prepareGameSummary(firstTeamId: number, secondTeamId: number): void {
    this.countWins(firstTeamId, secondTeamId);
    this.gameSummary.totalGames;
    this.gameSummary.firstTeamWins = this.firstTeamWins;
    this.gameSummary.secondTeamWins = this.secondTeamWins;
    this.gameSummary.averagePointsFirstTeam = this.firstTeamPointsSum;
    this.gameSummary.averagePointsSecondTeam = this.secondTeamPointsSum;
  }
}
