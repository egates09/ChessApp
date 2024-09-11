import { Button, Input } from "semantic-ui-react";
import { useState } from "react";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SplashPage = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchPlayerData = async () => {
    await fetch(`https://api.chess.com/pub/player/${search}`)
      .then((response) => response.json())
      .then((data) => {
        // setPlayerData(data)
        debugger;
        if (data.code === 0) setIsError(true);
        console.log(data);
      })
      .finally(() => setIsLoading(false)); //if error return red text w/ user not found
  };

  return (
    <>
      {!isError && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "1%",
              paddingBottom: "1%",
            }}
          >
            Please enter a username for Chess.com
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Input
              focus
              placeholder="Search usernames..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              disabled={isLoading}
              loading={isLoading}
              value={search}
              // iconPosition="left"
              // icon={
              //   <FontAwesomeIcon
              //     // className="header-padding"
              //     icon={faSearch}
              //   />
              // }

              style={{ marginRight: "0.5%" }}
            />
            <Button
              color="blue"
              content={"Search"}
              disabled={isLoading || search === ""}
              onClick={() => {
                setIsLoading(true);
                searchPlayerData();
              }}
            />
          </div>
        </>
      )}
      {isError && (
        <div
          style={{ display: "flex", justifyContent: "center", color: "red" }}
        >
          Please enter a valid username for Chess.com
        </div>
      )}
    </>
  );
};
