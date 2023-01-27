export default interface Player {
    id: string, // the location of this profile (always self-referencing)
    url: string, // the chess.com user's profile page (the username is displayed with the original letter case)
    username: string, // the username of this player
    player_id: number, // the non-changing Chess.com ID of this player
    title: string, // (optional) abbreviation of chess title, if any
    status: string, // account status: closed, closed:fair_play_violations, basic, premium, mod, staff
    name: string, // (optional) the personal first and last name
    avatar: string, // (optional) URL of a 200x200 image
    location: string, // (optional) the city or location
    country: string, // API location of this player's country's profile
    joined: number, // timestamp of registration on Chess.com
    last_online: number, // timestamp of the most recent login
    followers: number, // the number of players tracking this player's activity
    is_streamer: boolean, //if the member is a Chess.com streamer
    twitch_url: string,
    fide: number // FIDE rating
}