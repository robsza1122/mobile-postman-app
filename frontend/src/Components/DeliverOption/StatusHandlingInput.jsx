export const StatusHandlingInput = ({searchInput, setSearchInput}) => {
    return (
              <div className="deliver__inputcontent">
        <input
          type="text"
          className="deliver__input"
          placeholder="search position..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          src="src/image/magni-glass-black.svg"
          alt=""
          className="deliver__magniglassblack"
        />
      </div>
    )
}