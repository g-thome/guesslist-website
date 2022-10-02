import {
  Reducer,
  useReducer,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";

interface IDraft {
  title: string;
  items: string[];
  categories: string[];
  language: string;
}

export enum DraftActionType {
  UPDATE_TITLE,
  UPDATE_ITEMS,
  UPDATE_CATEGORIES,
  UPDATE_LANGUAGE,
  SET,
}

type DraftAction =
  | {
      type: DraftActionType.UPDATE_CATEGORIES;
      categories: string[];
    }
  | {
      type: DraftActionType.UPDATE_ITEMS;
      items: string[];
    }
  | {
      type: DraftActionType.UPDATE_LANGUAGE;
      language: string;
    }
  | {
      type: DraftActionType.UPDATE_TITLE;
      title: string;
    }
  | {
      type: DraftActionType.SET;
      newDraft: IDraft;
    };

const DraftContext = createContext<{ draft: IDraft; dispatch: Function }>({
  draft: {
    title: "",
    items: [],
    categories: [],
    language: "",
  },
  dispatch: () => {},
});

function updateState(state: IDraft, prop: string, value: string | string[]) {
  const newState = { ...state };
  newState[prop] = value;
  window.localStorage.setItem("draft", JSON.stringify(newState));
  return newState;
}

function reducer(state: IDraft, action: DraftAction) {
  switch (action.type) {
    case DraftActionType.UPDATE_TITLE:
      return updateState(state, "title", action.title);
    case DraftActionType.UPDATE_ITEMS:
      return updateState(state, "items", action.items);
    case DraftActionType.UPDATE_LANGUAGE:
      return updateState(state, "language", action.language);
    case DraftActionType.UPDATE_CATEGORIES:
      return updateState(state, "categories", action.categories);
    case DraftActionType.SET:
      return action.newDraft;
    default:
      return state;
  }
}

export const useDraftContext = () => useContext(DraftContext);

export function DraftContextProvider({ children }) {
  const initialDraft = useMemo(
    () => ({
      title: "",
      items: [],
      categories: [],
      language: "",
    }),
    []
  );

  const [draft, dispatch] = useReducer<Reducer<IDraft, DraftAction>>(
    reducer,
    initialDraft
  );

  useEffect(() => {
    dispatch({
      type: DraftActionType.SET,
      newDraft: JSON.parse(window.localStorage.getItem("draft")),
    });
  }, [dispatch]);

  useEffect(() => {
    if (draft !== initialDraft) {
      window.localStorage.setItem("draft", JSON.stringify(draft));
    }
  }, [draft, initialDraft]);

  return (
    <DraftContext.Provider value={{ draft, dispatch }}>
      {children}
    </DraftContext.Provider>
  );
}
