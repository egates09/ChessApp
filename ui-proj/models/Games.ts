export default interface Games {
    white: { // details of the white-piece player:
        username: string, // the username
        rating: number, // the player's rating after the game finished
        result: string, // see Game results codes section
        //@id: string // URL of this player's profile
    },
    black: { // details of the black-piece player:
        username: string, // the username
        rating: number, // the player's rating after the game finished
        result: string, // see Game results codes section
        //@id: string // URL of this player's profile
    },
    accuracies: { // player's accuracies, if they were previously calculated
        white: number,
        black: number
    },
    time_class: string,
    url: string, // URL of this game
    fen: string, // final FEN
    pgn: string, // final PGN
    start_time: number, // timestamp of the game start (Daily Chess only)
    end_time: number, // timestamp of the game end
    time_control: string, // PGN-compliant time control
    rules: string, // game variant information (e.g., chess960)
    eco: string, //URL pointing to ECO opening (if available),
    tournament: string, //URL pointing to tournament (if available),  
    match: string, //URL pointing to team match (if available)  
}