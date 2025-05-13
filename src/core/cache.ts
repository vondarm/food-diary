import { Observable, scan, startWith, switchMap } from "rxjs";

interface Entity {
  uuid: string;
}

type AddToListAction<T extends Entity> = {
  type: "addToList";
  item: T;
};
type RemoveFromListAction<T extends Entity> = {
  type: "removeFromList";
  item: T;
};

export const createListData = <T extends Entity>(
  fetcher: () => Promise<T[]>,
  actions$: Observable<AddToListAction<T> | RemoveFromListAction<T>>,
): Observable<T[]> => {
  return new Observable<T[]>((observer) => {
    fetcher().then((result) => observer.next(result));
  }).pipe(
    switchMap((initList) =>
      actions$.pipe(
        startWith(void 0),
        scan((list, action) => {
          if (!action) return list;
          if (action.type === "addToList") return [...list, action.item];
          if (action.type === "removeFromList")
            return list.filter((item) => item.uuid !== action.item.uuid);
          return list;
        }, initList),
      ),
    ),
  );
};

export const mapEntityToAddAction = <T extends Entity>(
  entity: T,
): AddToListAction<T> => ({ type: "addToList", item: entity });
export const mapEntityToRemoveAction = <T extends Entity>(
  entity: T,
): RemoveFromListAction<T> => ({ type: "removeFromList", item: entity });
