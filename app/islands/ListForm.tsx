import { useState } from "preact/hooks";

export default function ListForm() {
  const [createError, setCreateError] = useState('');
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  // TODO: add form types
  const formSubmitted = async (event: any) => {
    event.preventDefault();
    // validate
    if (event.target) {
      const formData = new FormData(event.target);
      const newList = {
        name: formData.get('name')?.toString() || '',
        description: formData.get('description')?.toString() || '',
      };
      let nameError = '';
      let descriptionError = '';
      if (!newList.name.trim()) {
        nameError = 'Name is required.';
      }
      if (!newList.description.trim()) {
        descriptionError = 'Description is required.';
      }
      if (nameError || descriptionError) {
        setErrors({
          name: nameError,
          description: descriptionError,
        });
      } else {
        const response = await fetch('/api/lists', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newList),
        });
        const data = await response.json();
        if (response.ok) {
          window.location.href = `/dashboard/lists/edit/${data.id}`;
        } else {
          setCreateError(data.message || response.statusText);
        }
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
          <label for="listName" class="form-label mt-4">
            Name
          </label>
          <input
            onInput={() => setErrors((current) => ({
              ...current,
              name: '',
            }))}
            type="text"
            class={`form-control ${errors.name ? 'is-invalid' : ''}`}
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
            onInput={() => setErrors((current) => ({
              ...current,
              description: '',
            }))}
            class={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="listDescription"
            name="description"
            aria-describedby="listDescriptionHelp"
            rows={3}
          >
          </textarea>
          {errors.description && <div class="invalid-feedback">{errors.description}</div>}
          <small id="listDescriptionHelp" class="form-text text-muted">
            A quick description of your list so people can understand what it is
            about.
          </small>
        </div>
      </fieldset>
      <div class="flex justify-end">
        <button class="btn btn-large btn-success">CREATE</button>
      </div>
    </form>
  );
}
