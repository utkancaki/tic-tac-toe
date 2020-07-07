import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default function App() {
  const [gameState, setGameState] = React.useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = React.useState(1);

  React.useEffect(() => initializeGame, []);

  initializeGame = () => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setCurrentPlayer(1);
  };

  getWinner = () => {
    var NUM_TILES = 3;
    var sum;

    // Check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = gameState[i][0] + gameState[i][1] + gameState[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check columns
    for (var i = 0; i < NUM_TILES; i++) {
      sum = gameState[0][i] + gameState[1][i] + gameState[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check diagonals
    sum = gameState[0][0] + gameState[1][1] + gameState[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }
    sum = gameState[2][0] + gameState[1][1] + gameState[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // No winners
    return 0;
  };

  onTilePress = (row, col) => {
    // Don't allow tiles change if it's already filled
    var value = gameState[row][col];
    if (value !== 0) {
      return;
    }

    // Grab current player
    var currentPlayerr = currentPlayer;

    // Set correct tile
    var arr = gameState.slice();
    arr[row][col] = currentPlayerr;
    setGameState(arr);

    // Switch to other player
    var nextPlayer = currentPlayerr == 1 ? -1 : 1;
    setCurrentPlayer(nextPlayer);

    // Check for winners
    var winner = getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 is the winner");
      initializeGame();
    } else if (winner == -1) {
      Alert.alert("Player 2 is the winner");
      initializeGame();
    }
  };

  renderIcon = (row, col) => {
    var value = gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tic-Tac-Toe</Text>
      </View>
      <View style={styles.board}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(0, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}
          >
            {renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(1, 1)}
            style={styles.tile}
          >
            {renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => onTilePress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
          >
            {renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTilePress(2, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}
          >
            {renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <Button title="New Game" onPress={initializeGame} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEBED",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 70,
  },
  headerText: {
    fontSize: 27,
    fontWeight: "bold",
    color: "tomato",
  },
  board: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tile: {
    borderWidth: 4,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  tileX: {
    color: "red",
    fontSize: 60,
  },
  tileO: {
    color: "green",
    fontSize: 60,
  },
  button: {
    marginTop: 50,
    marginBottom: 100,
  },
});
