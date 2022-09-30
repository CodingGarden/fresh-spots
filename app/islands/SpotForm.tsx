import { z } from "@/deps.ts";
import { useState } from "preact/hooks";
import { editingSpot, editingList } from "@/signals/index.ts";
import { Spot } from "@/db/tables/SpotTable.ts";

export default function SpotForm() {
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
      const response = await fetch("/api/spots", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(validated),
      });
      const data = await response.json();
      if (response.ok) {
        editingSpot.value = null;
        // TODO: move this logic to an API handler.
        const response = await fetch(`/api/lists/${editingList.value!.id}`);
        editingList.value = await response.json();
      } else {
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
    <form onSubmit={formSubmitted}>
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
          <input
            disabled
            value={[
              editingSpot.value?.latitude,
              editingSpot.value?.longitude,
            ].join(", ")}
            type="text"
            class="form-control"
            id="spotLocation"
            name="location"
          />
        </div>
      </fieldset>
      <div class="flex justify-end">
        <button class="btn btn-large btn-success">SAVE</button>
      </div>
    </form>
  );
}
