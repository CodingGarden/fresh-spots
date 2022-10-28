import { z } from "@/deps.ts";
import { useState } from "preact/hooks";
import {
  editingSpot,
  editingList,
  editingSpotUnsavedChanges,
} from "@/signals/index.ts";
import { Spot } from "@/db/tables/SpotTable.ts";
import Alert from "@/components/Alert.tsx";
import ConfirmationButtons from "@/islands/ConfirmationButtons.tsx";
import { getErrorMessages } from "../utils/zodErrorUtils.ts";

export default function SpotForm() {
  const [createError, setCreateError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const formSubmitted = async (event: any) => {
    event.preventDefault();
    try {
      const validated = await Spot.parseAsync(editingSpot.value);
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
        const response = await fetch(`/api/lists/${editingList.value!.slug}`);
        editingList.value = await response.json();
      } else {
        console.log("setting error...", data.message || response.statusText);
        setCreateError(data.message || response.statusText);
      }
    } catch (error) {
      console.log(error);
      const zError = error as z.ZodError;
      if (zError.errors) {
        const errorMessages = getErrorMessages(zError.errors);
        console.log(errorMessages.fieldMap);
        setErrors({
          name: errorMessages.get("name"),
          description: errorMessages.get("description"),
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
          <p class="text-gray-400">
            {editingSpot.value?.latitude}
            <br />
            {editingSpot.value?.longitude}
          </p>
        </div>
      </fieldset>
      <ConfirmationButtons
        bypassConfirmation={!editingSpotUnsavedChanges.value}
        onConfirm={() => {
          editingSpot.value = null;
          editingSpotUnsavedChanges.value = false;
        }}
        rightButtons={
          editingSpot.value?.id ? (
            <button type="submit" class="btn btn-large btn-success">
              UPDATE SPOT
            </button>
          ) : (
            <button type="submit" class="btn btn-large btn-success">
              ADD SPOT
            </button>
          )
        }
      />
    </form>
  );
}
