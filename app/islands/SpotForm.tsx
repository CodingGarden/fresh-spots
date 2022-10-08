import { z } from "@/deps.ts";
import { useState } from "preact/hooks";
import {
  editingSpot,
  editingList,
  editingSpotUnsavedChanges,
} from "@/signals/index.ts";
import { Spot } from "@/db/tables/SpotTable.ts";
import Alert from "@/components/Alert.tsx";

export default function SpotForm() {
  const [isCanceling, setIsCanceling] = useState(false);
  const [createError, setCreateError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  // TODO: add form types
  const formSubmitted = async (event: any) => {
    event.preventDefault();
    try {
      const validated = await Spot.parseAsync(editingSpot.value);
      // TODO: add map tile for use later
      // http://jsfiddle.net/84P9r/
      validated.list_id = editingList.value!.id;
      let response;
      const jsonType = "application/json";
      if (validated.id) {
        // UPDATE
        response = await fetch(`/api/spots/${validated.id}`, {
          method: "PUT",
          headers: {
            accept: jsonType,
            "content-type": jsonType,
          },
          body: JSON.stringify(validated),
        });
      } else {
        // CREATE
        response = await fetch("/api/spots", {
          method: "POST",
          headers: {
            accept: jsonType,
            "content-type": jsonType,
          },
          body: JSON.stringify(validated),
        });
      }
      const data = await response.json();
      if (response.ok) {
        editingSpot.value = null;
        editingSpotUnsavedChanges.value = false;
        // TODO: move this logic to an API handler.
        const response = await fetch(`/api/lists/${editingList.value!.id}`);
        editingList.value = await response.json();
      } else {
        console.log("setting error...", data.message || response.statusText);
        setCreateError(data.message || response.statusText);
      }
    } catch (error) {
      const zError = error as z.ZodError;
      if (zError.errors) {
        const getErrorMessage = (path: string) =>
          zError.errors.find((e) => e.path[0] === path)?.message || "";
        setErrors({
          name: getErrorMessage("name"),
          description: getErrorMessage("description"),
        });
      }
    }
  };

  return (
    <form
      class={`mt-3 mb-5 card p-3 ${
        editingSpotUnsavedChanges.value ? "border-warning" : "border-light"
      }`}
      onSubmit={formSubmitted}
    >
      {createError && (
        <div class="alert alert-danger" role="alert">
          {createError}
        </div>
      )}
      <fieldset>
        <div class="form-group">
          <label for="spotName" class="form-label mt-4">
            Name
          </label>
          <input
            onInput={(event) => {
              editingSpot.value = {
                ...editingSpot.value!,
                name: event.currentTarget.value,
              };
              editingSpotUnsavedChanges.value = true;
              setErrors((current) => ({
                ...current,
                name: "",
              }));
            }}
            value={editingSpot.value?.name}
            type="text"
            class={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="spotName"
            name="name"
            aria-describedby="spotNameHelp"
            placeholder="Enter a spot name"
          />
          {errors.name && <div class="invalid-feedback">{errors.name}</div>}
          <small id="spotNameHelp" class="form-text text-muted">
            The name of your spot.
          </small>
        </div>
        <div class="form-group">
          <label for="spotDescription" class="form-label mt-4">
            Description
          </label>
          <textarea
            onInput={(event) => {
              editingSpot.value = {
                ...editingSpot.value!,
                description: event.currentTarget.value,
              };
              editingSpotUnsavedChanges.value = true;
              setErrors((current) => ({
                ...current,
                description: "",
              }));
            }}
            value={editingSpot.value?.description}
            class={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="spotDescription"
            name="description"
            aria-describedby="spotDescriptionHelp"
            rows={3}
          ></textarea>
          {errors.description && (
            <div class="invalid-feedback">{errors.description}</div>
          )}
          <small id="spotDescriptionHelp" class="form-text text-muted">
            A quick description of your spot so people can understand why it is
            on this list.
          </small>
        </div>
      </fieldset>
      <fieldset>
        <div class="form-group">
          <label for="spotLocation" class="form-label mt-4">
            Location
          </label>
          {/* TODO: maybe add an edit location state / button */}
          <p class="text-gray-400">
            {editingSpot.value?.latitude}
            <br />
            {editingSpot.value?.longitude}
          </p>
        </div>
      </fieldset>
      {isCanceling ? (
        <>
          <Alert
            margin={false}
            className="mt-4"
            message="Are you sure you want to cancel? You will lose any unsaved changes."
          />
          <div class="flex justify-end mt-4 gap-3">
            <button
              onClick={() => setIsCanceling(false)}
              type="button"
              class="btn btn-large btn-outline-light"
            >
              Keep Changes
            </button>
            <button
              onClick={() => {
                editingSpot.value = null;
                setIsCanceling(false);
                editingSpotUnsavedChanges.value = false;
              }}
              type="button"
              class="btn btn-large btn-warning"
            >
              Discard changes
            </button>
          </div>
        </>
      ) : (
        <div class="flex justify-end mt-3 gap-3">
          <button
            onClick={() => {
              if (!editingSpotUnsavedChanges.value) {
                editingSpot.value = null;
              } else {
                setIsCanceling(true);
              }
            }}
            type="button"
            class="btn btn-large btn-warning"
          >
            CANCEL
          </button>
          {editingSpot.value?.id ? (
            <button type="submit" class="btn btn-large btn-success">
              UPDATE SPOT
            </button>
          ) : (
            <button type="submit" class="btn btn-large btn-success">
              ADD SPOT
            </button>
          )}
        </div>
      )}
    </form>
  );
}
