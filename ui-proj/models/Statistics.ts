export default interface Statistics {
    chess_blitz: {
        best: {
            date: number,
            game: string,
            rating: number
        },
        last: {
            date: number,
            rating: number,
            rd: number
        },
        record: {
            draw: number,
            loss: number,
            win: number
        }
    },
    chess_bullet: {
        best: {
            date: number,
            game: string,
            rating: number
        },
        last: {
            date: number,
            rating: number,
            rd: number
        },
        record: {
            draw: number,
            loss: number,
            win: number
        }
    },
    chess_rapid: {
        best: {
            date: number,
            game: string,
            rating: number
        },
        last: {
            date: number,
            rating: number,
            rd: number
        },
        record: {
            draw: number,
            loss: number,
            win: number
        }
    }
}