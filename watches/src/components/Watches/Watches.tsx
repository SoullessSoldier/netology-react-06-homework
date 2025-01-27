import { useState } from "react"
import WatchControl from "../WatchControl/WatchControl"
import Watch from "../Watch/Watch";
import { TCity, TWatch } from "@/types";
import "./watches.css";

const Watches = () => {
    const [watchesState, setWatchesState] = useState<TWatch[]>([
      { id: 0, offset: 2, city: "Калининград" },
      { id: 1, offset: 3, city: "Москва" },
    ]);

    const handleRemoveWatch = (id: number) => {
      setWatchesState(watchesState.filter((watch) => watch.id !== id));
    };

    const handleAddWatch = (data: TCity) => {
        const id = watchesState.length;
        setWatchesState((prevState) => [...prevState, {id, offset: data.offset, city: data.city}])
    }

    return (
      <div className="watches">
        <WatchControl onAddWatch={handleAddWatch} />
        <div className="watches-content">
          {watchesState.map((watch) => {
            return (
              <Watch
                key={watch.id}
                data={watch}
                onRemove={() => handleRemoveWatch(watch.id)}
              />
            );
          })}
        </div>
      </div>
    );
}

export default Watches;