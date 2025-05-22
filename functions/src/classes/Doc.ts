import { ParamsOf } from "firebase-functions/v2";
import {
  onDocumentCreated,
  onDocumentDeleted,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import print from "../functions/print";

export default class Doc<T, Document extends string> {
  constructor(private document: Document, private sample_obj: T) { }

  //! UPDATED
  updated(
    callback: (
      oldData: T,
      newData: T,
      params: ParamsOf<Document>
    ) => Promise<void>
  ) {
    return onDocumentUpdated(this.document, async (event) => {
      if (!event || !event.data) return;

      const oldData = event.data.before.data() as T;
      const newData = event.data.after.data() as T;

      try {
        await callback(oldData, newData, event.params);
      } catch (error) {
        print(error, true);
      }
    });
  }

  //! CREATED
  created(callback: (data: T, params: ParamsOf<Document>) => Promise<void>) {
    return onDocumentCreated(this.document, async (event) => {
      if (!event || !event.data) return;

      const data = event.data.data() as T;

      try {
        await callback(data, event.params);
      } catch (error) {
        print(error, true);
      }
    });
  }

  //! DELETED
  deleted(callback: (data: T, params: ParamsOf<Document>) => Promise<void>) {
    return onDocumentDeleted(this.document, async (event) => {
      if (!event || !event.data) return;

      const data = event.data.data() as T;

      try {
        await callback(data, event.params);
      } catch (error) {
        print(error, true);
      }
    });
  }
}
