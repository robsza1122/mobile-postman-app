type TrailInputProps = {
  setParcelsNumber: (number: string) => void;
  parcelsNumber: string;
  onSubmit: () => void;
};

export const TrailInput = ({ setParcelsNumber, parcelsNumber, onSubmit }: TrailInputProps) => {
  return (
    <div className="trail__inputkeyboard">
      <input
        type="text"
        className="trail__input"
        placeholder="Parcel's number..."
        value={parcelsNumber}
        onChange={(e) => setParcelsNumber(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <img src="src/image/keyboard.svg" alt="" className="trail__keyboard" />
    </div>
  );
};
