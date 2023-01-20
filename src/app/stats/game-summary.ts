export class GameSummary {
  totalGames: number;
  firstTeamWins: number;
  secondTeamWins: number;
  averagePointsFirstTeam: number;
  averagePointsSecondTeam: number;
  nugget: string;

  constructor(
    totalGames: number,
    firstTeamWins: number,
    secondTeamWins: number,
    averagePointsFirstTeam: number,
    averagePointsSecondTeam: number,
    nugget: string
  ) {
    this.totalGames = totalGames;
    this.firstTeamWins = firstTeamWins;
    this.secondTeamWins = secondTeamWins;
    this.averagePointsFirstTeam = averagePointsFirstTeam;
    this.averagePointsSecondTeam = averagePointsSecondTeam;
    this.nugget = nugget;
  }
}
