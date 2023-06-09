import React from 'react';
import useInput from '../../hooks/useInput';
import Modal from './Modal';
import { v4 as uuid } from 'uuid';
import { useCreatePlaylistMutation } from '../../store/features/ServerApi';
import Cookies from 'universal-cookie';
import { TrackItem } from '../../types/types';
import { useDispatch } from 'react-redux';
import { showInfo } from '../../store/uiSlice';

const isNotEmpty = (value: string) => value.trim() !== '';

const CreatePlaylist: React.FC<{
  onClose: () => void;
  onCreated: () => void;
}> = ({ onClose, onCreated }) => {
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasErrors: nameHasErrors,
    valueBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasErrors: descriptionHasErrors,
    valueBlurHandler: descriptionBlurHandler,
    valueChangeHandler: descriptionChangeHandler,
    reset: descriptionReset,
  } = useInput(isNotEmpty);
  const {
    value: imageUrlValue,
    isValid: imageUrlIsValid,
    hasErrors: imageUrlHasErrors,
    valueBlurHandler: imageUrlBlurHandler,
    valueChangeHandler: imageUrlChangeHandler,
    reset: imageUrlReset,
  } = useInput(isNotEmpty);

  const [createPlaylist, result] = useCreatePlaylistMutation();
  const dispatch = useDispatch();

  let formIsValid = false;
  if (nameIsValid && imageUrlIsValid && descriptionIsValid) {
    formIsValid = true;
  }
  const sumbitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formIsValid) return;
    createPlaylist({
      name: nameValue,
      description: descriptionValue,
      images: [{ url: imageUrlValue }],
      owner: { display_name: localStorage.getItem('USERNAME') || '' },
      tracks: { items: [], total: 0 },
      followers: { total: 0 },
      public: !checkboxValue,
      createdBy: localStorage.getItem('ID')!,
      id: uuid(),
    }).then((res: any) => {
      dispatch(showInfo(res.data.message));
      onCreated();
    });
    nameReset();
    descriptionReset();
    imageUrlReset();
    onClose();
  };

  const inputClasses = 'flex flex-col gap-2 justify-center w-full items-start';
  const invalid = 'text-red-500';

  return (
    <div className="flex h-full flex-col items-center justify-center p-10 text-white">
      <h1
        className="
      text-4xl font-bold
      "
      >
        Create Playlist
      </h1>
      <form
        action=""
        onSubmit={sumbitFormHandler}
        className="flex w-5/6 flex-col items-center justify-center gap-5"
      >
        <div className={` ${inputClasses}`}>
          <label htmlFor="name">Playlist Name</label>
          <input
            type="text"
            placeholder="Playlist name "
            className="w-full rounded-lg p-2 text-black outline-none"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasErrors && (
            <p className={`${invalid}`}>Enter Valid Playlist Name</p>
          )}
        </div>
        <div className={` ${inputClasses}`}>
          <label htmlFor="description">Playlist Description</label>
          <textarea
            placeholder="Playlist description"
            className="w-full rounded-lg p-2 text-black outline-none"
            value={descriptionValue}
            id="description"
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {descriptionHasErrors && (
            <p className={`${invalid}`}>Enter Valid Playlist Description</p>
          )}
        </div>
        <div className={` ${inputClasses}`}>
          <label htmlFor="image">Playlist Cover</label>
          <input
            type="text"
            placeholder="Image cover url "
            className="w-full rounded-lg p-2 text-black outline-none"
            value={imageUrlValue}
            id="image"
            onChange={imageUrlChangeHandler}
            onBlur={imageUrlBlurHandler}
          />
          {imageUrlHasErrors && (
            <p className={`${invalid}`}>Enter Valid Playlist Cover</p>
          )}
        </div>
        <div className="flex items-center gap-2 self-start">
          <label htmlFor="public">Private ? </label>
          <input
            type="checkbox"
            id="public"
            onChange={(e) => setCheckboxValue(e.target.checked)}
          />
        </div>
        <button
          disabled={!formIsValid}
          type="submit"
          className="w-24 rounded-md bg-green-300 p-3 font-semibold text-black "
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
