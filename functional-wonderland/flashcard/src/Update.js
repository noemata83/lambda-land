import * as R from 'ramda';

const MSGS = {
  QUESTION_INPUT: 'QUESTION_INPUT',
  ANSWER_INPUT: 'ANSWER_INPUT',
  ADD_FLASHCARD: 'ADD_FLASHCARD', 
  TOGGLE_FORM: 'TOGGLE_FORM',
  EDIT_FLASHCARD: 'EDIT_FLASHCARD',
  SAVE_FLASHCARD: 'SAVE_FLASHCARD',
  DISPLAY_ANSWER: 'DISPLAY_ANSWER',
  UPDATE_QUESTION_INPUT: 'UPDATE_QUESTION_INPUT',
  UPDATE_ANSWER_INPUT: 'UPDATE_ANSWER_INPUT',
  DELETE_FLASHCARD: 'DELETE_FLASHCARD'
}

export const addFlashcard = { type: MSGS.ADD_FLASHCARD };

export function questionInputMsg(question) {
  return {
    type: MSGS.QUESTION_INPUT,
    question
  }
}

export function answerInputMsg(answer) {
  return {
    type: MSGS.ANSWER_INPUT,
    answer
  }
}

export function displayAnswerMsg(id) {
  return {
    type: MSGS.DISPLAY_ANSWER,
    id
  }
}

export function updateQuestionInputMsg(id, questionInput) {
  return {
    type: MSGS.UPDATE_QUESTION_INPUT,
    id,
    questionInput
  }
}

export function updateAnswerInputMsg(id, answerInput) {
  return {
    type: MSGS.UPDATE_ANSWER_INPUT,
    id,
    answerInput
  }
}

export function editFlashcardMsg(id) {
  console.log("Hello from editFlashcardMsg");
  return {
    type: MSGS.EDIT_FLASHCARD,
    id
  }
}

export function saveFlashcardMsg(id) {
  console.log("hello from saveFlashcardMsg");
  return {
    type: MSGS.SAVE_FLASHCARD,
    id
  }
}

export function deletFlashcardMsg(id) {
  return {
    type: MSGS.DELETE_FLASHCARD,
    id
  }
}

export const toggleForm = { type: MSGS.TOGGLE_FORM };

function update(msg, model) {
  switch (msg.type) {
    case (MSGS.TOGGLE_FORM): {
      const showForm = !model.showForm;
      return {
        ...model,
        showForm
      }
    }
    case (MSGS.QUESTION_INPUT): {
      const { question } = msg;
      return {
        ...model,
        question
      }
    }
    case (MSGS.ANSWER_INPUT): {
      const { answer } = msg;
      return {
        ...model,
        answer
      }
    }
    case (MSGS.ADD_FLASHCARD): {
      const { question, answer, nextId } = model;
      const flashcards = [...model.flashcards, {
        question,
        answer,
        id: nextId, 
        revealed: false,
        editing: false,
        rank: 0,
        questionInput: question,
        answerInput: answer
      }];
      return {
        ...model,
        flashcards,
        question: '',
        answer: '',
        showForm: false,
        nextId: nextId + 1
      }
    }
    case(MSGS.EDIT_FLASHCARD): {
      const { id } = msg;
      console.log(id);
      const flashcards = R.map(flashcard => {
        if (flashcard.id === id ) {
          return { ...flashcard,
                   editing: true}
        }
        return flashcard;
      }, model.flashcards);
      return {
        ...model,
        flashcards
      }
    }
    case(MSGS.UPDATE_QUESTION_INPUT): {
      const {id, questionInput } = msg;
      const flashcards = R.map(flashcard => {
        if (flashcard.id === id) {
          return { ...flashcard, questionInput}
        }
        return flashcard;
      }, model.flashcards);
      return {
        ...model,
        flashcards
      }
    }
    case(MSGS.UPDATE_ANSWER_INPUT): {
      const {id, answerInput} = msg;
      const flashcards = R.map(flashcard => {
        if (flashcard.id === id) {
          return {...flashcard, answerInput}
        }
        return flashcard;
      }, model.flashcards);
      return {
        ...model,
        flashcards
      }
    }
    case(MSGS.DISPLAY_ANSWER): {
      const { id } = msg;
      const flashcards = R.map(flashcard => {
        if (flashcard.id === id) {
          return {
            ...flashcard,
            revealed: true
          }
        }
        return flashcard;
      }, model.flashcards);
      return {
        ...model,
        flashcards
      }
    }
    case(MSGS.SAVE_FLASHCARD): {
      const { id } = msg;
      const flashcards = R.map(flashcard => {
        if (flashcard.id === id ) {
          return {
            ...flashcard,
            question: flashcard.questionInput,
            answer: flashcard.answerInput,
            editing: false,
            revealed: false
          }
        }
        return flashcard;  
      }, model.flashcards);
      return {
        ...model,
        flashcards
      }
    }
    case(MSGS.DELETE_FLASHCARD): {
      const { id } = msg;
      const flashcards = R.filter(flashcard => flashcard.id !== id, model.flashcards);
      return {
        ...model,
        flashcards
      }
    }
    default:
      return model;
  }
}

function toggleEdit(msg, model) {

}

function updateFlashcard(msg, model) {

}
export default update;
