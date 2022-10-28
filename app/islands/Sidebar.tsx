import { useState } from "preact/hooks";
import { map } from "@/signals/index.ts";
import SpotForm from "@/islands/SpotForm.tsx";
import ListForm from "@/islands/ListForm.tsx";

import {
  editingList,
  editingSpot,
  editingSpotUnsavedChanges,
} from "@/signals/index.ts";
import ConfirmationButtons from "@/islands/ConfirmationButtons.tsx";
import Alert from "@/components/Alert.tsx";

export default function SideBar() {
  const [isEditingList, setIsEditingList] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const deleteList = async () => {
    const response = await fetch(`/api/lists/${editingList.value!.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      setDeleteError(response.statusText);
    }
  };
  return (
    <div
      id="drawer-example"
      class="h-full p-4 overflow-y-auto w-2/5 min-w-[300px]"
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      {editingList.value &&
        (isEditingList ? (
          <ListForm setIsEditingList={setIsEditingList} />
        ) : (
          <div class="mb-4">
            {deleteError && <Alert message={deleteError} />}
            <h2>{editingList.value?.name}</h2>
            <p class="card-text">{editingList.value?.description}</p>
            <div class="card-footer text-muted">
              <ConfirmationButtons
                onConfirm={deleteList}
                confirmationAlertMessage="Are you sure you want to delete this list? This cannot be undone and all associated spots will be deleted as well."
                cancelText="KEEP LIST"
                confirmationText="DELETE LIST"
                confirmationButtonText="DELETE"
                confirmationButtonColor="outline-danger"
                rightButtons={
                  <button
                    onClick={() => setIsEditingList(true)}
                    class="btn btn-outline-success"
                  >
                    Edit List
                  </button>
                }
              />
            </div>
          </div>
        ))}
      <hr />
      {editingSpot.value && <SpotForm />}
      <div class="mt-2">
        {!editingList.value?.spots.length && !editingSpot.value && (
          <h5>Click the map to add a spot.</h5>
        )}
        {editingList.value?.spots.map((spot) => (
          <div
            onClick={() => {
              if (map.value) {
                if (!editingSpotUnsavedChanges.value) {
                  editingSpot.value = spot;
                  map.value.flyTo([spot.latitude, spot.longitude], 15, {
                    duration: 1,
                  });
                }
              }
            }}
            class={`card mb-2 ${
              !editingSpotUnsavedChanges.value
                ? "cursor-pointer"
                : "cursor-no-drop"
              // deno-lint-ignore ban-ts-comment
              // @ts-ignore
            } ${editingSpot.value?.id === spot.id ? "active" : ""}`}
          >
            <div class="card-header">{spot.name}</div>
            <div class="card-body">
              <p class="card-text">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
