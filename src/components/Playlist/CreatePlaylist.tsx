import React from 'react';
import useInput from '../../hooks/useInput';
import Modal from './Modal';
import { v4 as uuid } from 'uuid';
import { useCreatePlaylistMutation } from '../../store/features/ServerApi';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const username = cookies.get('USERNAME');
const isNotEmpty = (value: string) => value.trim() !== '';

const CreatePlaylist: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
      image: imageUrlValue,
      owner: { display_name: cookies.get('USERNAME') },
      songs: [],
      id: uuid(),
    });
    nameReset();
    descriptionReset();
    imageUrlReset();
    onClose();
  };

  const inputClasses = 'flex flex-col gap-2 justify-center w-full items-start';
  const invalid = 'text-red-500';

  return (
    <div className="flex flex-col justify-center p-10 items-center h-full text-white">
      <form
        action=""
        onSubmit={sumbitFormHandler}
        className="flex flex-col gap-5 justify-center items-center w-5/6"
      >
        <div className={` ${inputClasses}`}>
          <label htmlFor="name">Playlist Name</label>
          <input
            type="text"
            placeholder="Playlist name "
            className="p-2 outline-none text-black w-full rounded-lg"
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
            className="p-2 outline-none text-black w-full rounded-lg"
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
            className="p-2 outline-none text-black w-full rounded-lg"
            value={imageUrlValue}
            id="image"
            onChange={imageUrlChangeHandler}
            onBlur={imageUrlBlurHandler}
          />
          {imageUrlHasErrors && (
            <p className={`${invalid}`}>Enter Valid Playlist Cover</p>
          )}
        </div>
        <button
          disabled={!formIsValid}
          type="submit"
          className="bg-green-300 p-3 rounded-md w-24 text-black font-semibold "
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
