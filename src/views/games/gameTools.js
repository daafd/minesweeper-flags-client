import Kotlin from "kotlin";
let coreLib = require("../../kotlin/minesweeper-core");
let core = coreLib.default.net.zomis.minesweeper.core;
let mapFactory = new core.MapFactory();

function setPlayerNames(game, players) {
  players.forEach((playerName, index) => {
    game.map.players.toArray()[index].controller.name = playerName;
  });
}

function createPlayer(map, playerIndex) {
  return {
    player: map.players.toArray()[playerIndex],
    lastMove: null,
    selectedWeapon: 0,
    controllable: false
  };
}

function createGameFromMap(map) {
  return {
    gameId: -1,
    playerData: [createPlayer(map, 0), createPlayer(map, 1)],
    clickable: true,
    eliminations: [],
    yourResult: null,
    map: map
  };
}

function createGame(gameInfo) {
  let map = new core.Game(16, 16);
  map = map.plugin(events => {
    events
      .feature(core.plugins.StandardWeapons)
      .feature(core.plugins.ClassicNeighbors);
  });
  map.addPlayer(new core.PlayerController("Nothing", () => null));
  map.addPlayer(new core.PlayerController("Nothing", () => null));
  map.placeMines(51, Kotlin.kotlin.random.Random.Default);
  map.recount();
  let game = createGameFromMap(map);
  game.gameId = gameInfo.gameId;
  let index = parseInt(gameInfo.yourIndex, 10);
  if (index >= 0) {
    game.playerData[index].controllable = true;
  }
  return game;
}

function createLocalGame() {
  let map = mapFactory.classic(16);
  map.placeMines(51, Kotlin.kotlin.random.Random.Default);
  map.recount();
  let game = createGameFromMap(map);
  game.playerData.forEach(pl => (pl.controllable = true));
  return game;
}

export default {
  createGame: createGame,
  createGameFromMap: createGameFromMap,
  createLocalGame: createLocalGame,
  setPlayerNames: setPlayerNames
};
