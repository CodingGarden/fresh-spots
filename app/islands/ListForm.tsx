import { useState, useEffect } from "preact/hooks";
import { editingList } from "@/signals/index.ts";
import { SpotList } from "@/db/tables/SpotListTable.ts";
import { getErrorMessages } from "@/utils/zodErrorUtils.ts";

export default function ListForm() {
  const [createError, setCreateError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [list, setList] = useState({
    name: editingList.value?.name || "",
    description: editingList.value?.description || "",
    published: editingList.value?.published || false,
    public: editingList.value?.public || false,
  });

  useEffect(() => {
    setList({
      name: editingList.value?.name || "",
      description: editingList.value?.description || "",
      published: editingList.value?.published || false,
      public: editingList.value?.public || false,
    });
  }, [editingList.value]);

  const formSubmitted = async (event: any) => {
    event.preventDefault();
    if (event.target) {
      try {
        const validated = await SpotList.parseAsync(list);
        if (editingList.value) {
          // PUT request...
        } else {
          const response = await fetch("/api/lists", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(validated),
          });
          const data = await response.json();
          if (response.ok) {
            window.location.href = `/dashboard/lists/edit/${data.slug}`;
          } else {
            setCreateError(data.message || response.statusText);
          }
        }
      } catch (error) {
        if (error.errors) {
          const errorMessages = getErrorMessages(error.errors);
          setErrors({
            name: errorMessages.get("name"),
            description: errorMessages.get("description"),
          });
        }
      }
    }
  };

  const togglePublished = () => {
    setList((current) => ({
      ...current,
      public: false,
      published: !current.published,
    }));
  };

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
      setCreateError(response.statusText);
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
          <label for="listName" class="form-label mt-4">
            Name
          </label>
          <input
            onInput={(event) => {
              setErrors((current) => ({
                ...current,
                name: "",
              }));
              setList((current) => ({
                ...current,
                name: event.currentTarget.value,
              }));
            }}
            value={list.name}
            type="text"
            class={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="listName"
            name="name"
            aria-describedby="listNameHelp"
            placeholder="Enter a list name"
          />
          {errors.name && <div class="invalid-feedback">{errors.name}</div>}
          <small id="listNameHelp" class="form-text text-muted">
            The name of your list, like "Top 10 Restaurants" or "Best Pizza in
            Denver"
          </small>
        </div>
        <div class="form-group">
          <label for="listDescription" class="form-label mt-4">
            Description
          </label>
          <textarea
            onInput={(event) => {
              setErrors((current) => ({
                ...current,
                description: "",
              }));
              setList((current) => ({
                ...current,
                description: event.currentTarget.value,
              }));
            }}
            value={list.description}
            class={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="listDescription"
            name="description"
            aria-describedby="listDescriptionHelp"
            rows={3}
          ></textarea>
          {errors.description && (
            <div class="invalid-feedback">{errors.description}</div>
          )}
          <small id="listDescriptionHelp" class="form-text text-muted">
            A quick description of your list so people can understand what it is
            about.
          </small>
        </div>
        {editingList.value && (
          <>
            <div
              class="btn-group mt-2"
              role="group"
              aria-label="Published State"
            >
              <input
                type="radio"
                class="btn-check"
                name="draft"
                id="draft"
                autocomplete="off"
                checked={!list.published}
                onClick={togglePublished}
              />
              <label class="btn btn-outline-success" for="draft">
                Draft
              </label>
              <input
                onClick={togglePublished}
                type="radio"
                class="btn-check"
                name="published"
                id="published"
                autocomplete="off"
                checked={list.published}
              />
              <label class="btn btn-outline-success" for="published">
                Published
              </label>
            </div>
            <fieldset class="form-group mt-2">
              <div class="form-check">
                <input
                  onClick={() => {
                    setList((current) => ({
                      ...current,
                      public: !current.public,
                    }));
                  }}
                  disabled={!list.published}
                  checked={list.public}
                  class="form-check-input"
                  type="checkbox"
                  id="public"
                />
                <label
                  disabled={!list.published}
                  class="form-check-label"
                  for="public"
                >
                  Show On Profile
                </label>
              </div>
            </fieldset>
          </>
        )}
      </fieldset>
      <div class="flex justify-end gap-2">
        {editingList.value && (
          <button
            onClick={deleteList}
            type="button"
            class="btn btn-large btn-danger"
          >
            DELETE
          </button>
        )}
        <button class="btn btn-large btn-success" type="submit">
          {editingList.value ? "SAVE" : "CREATE"}
        </button>
      </div>
    </form>
  );
}
