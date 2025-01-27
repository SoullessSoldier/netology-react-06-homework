import { TWatchControl } from "@/types";
import "./watchControl.css";

const WatchControl: React.FC<TWatchControl> = ({onAddWatch}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const city = formData.get("city") as string || "";
    const offset = formData.get("offset") as string || "0";
    onAddWatch({city, offset: parseInt(offset)});
    form.reset();
  };

  const arrayRange = (start: number, stop: number, step = 1) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, index) => start + index * step
    );
  return (
    <form className="watch-control-form" onSubmit={handleSubmit}>
      <div className="watch-control-element">
        <label className="watch-control-label" htmlFor="city">Название</label>
        <input id="city" type="text" name="city" required />
      </div>
      <div className="watch-control-element">
        <label className="watch-control-label" htmlFor="offset">
          Часовой пояс
        </label>
        <select id="offset" name="offset" defaultValue={3}>
          {arrayRange(-12, 14, 1).map((item, index) => (
            <option
              value={item}
              label={
                item < 0
                  ? `UTC${item}`
                  : item === 3
                  ? `UTC+${item} (МСК)`
                  : `UTC+${item}`
              }
              key={index}
            ></option>
          ))}
        </select>
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default WatchControl;
