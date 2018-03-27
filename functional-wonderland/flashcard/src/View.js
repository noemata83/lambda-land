import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { addFlashcard, questionInputMsg, answerInputMsg, updateQuestionInputMsg, 
  updateAnswerInputMsg, toggleForm, displayAnswerMsg, editFlashcardMsg, 
  saveFlashcardMsg, deleteFlashcardMsg, updateFlashcardRankMsg } from './Update';

const { pre, div, a, h1, textarea, form, input, label, button, i } = hh(h);

function fieldSet(inputLabel, value, oninput ) {
  return div([
    label({ className: 'db mb1'}, inputLabel),
    input({ 
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value,
      oninput 
    })
  ]);
}

function formView(dispatch, model) {
  const { showForm, question, answer } = model;
  if (showForm) {
      return form(
        { 
          className: 'w-100 mv2',
          onsubmit: e => {
              e.preventDefault();
              dispatch(addFlashcard);
          },
        },
        [
          fieldSet('Question', question, e => dispatch(questionInputMsg(e.target.value))),
          fieldSet('Answer', answer, e => dispatch(answerInputMsg(e.target.value))),
          button(
            {className: 'pa2 br1 mv2 bg-red mr2 bn white',
              onclick: () => dispatch(toggleForm)
            }, 'Cancel'),
          button( 
            { className: 'pa2 br1 mv2 bg-green bn white',
              type: 'submit' }, 'Add')
          ]
      );
    }
  return button({
    className: 'pa2 br1 mv2 bg-green bn white',
    onclick: () => dispatch(toggleForm)
  }, 
  [
    i({className: "fa fa-plus ph1"}), 
    'Add Flashcard'
  ]);
}

function answerDisplay(dispatch, revealed, id, answer, rank) {
  if (revealed) {
    return div([
      revealAnswer(dispatch, id, answer),
      rankingButtons(dispatch, id, rank),
      ]);
  }
  return div(a({ className: 'f6 underline link pointer',
                 onclick: () => dispatch(displayAnswerMsg(id)) }, 
                 'Show Answer'));
}

function revealAnswer(dispatch, id, answer) {
  return div([
    div({ className: 'b f6 mv1 underline' }, 'Answer'),
    div({ className: 'pointer', onclick: () => dispatch(editFlashcardMsg(id))}, answer)
  ]);
}

function rankingButtons(dispatch, id, rank) {
  return div({className: 'absolute bottom-0 left-0 w-100 ph2' },
    div({ className: 'mv2 flex justify-between' }, [
      button({ className: 'f4 ph3 pv2 bg-red bn white br1', onclick: () => dispatch(updateFlashcardRankMsg(id, 0)) }, 'Bad'),
      button({ className: 'f4 ph3 pv2 bg-blue bn white br1', onclick: () => dispatch(updateFlashcardRankMsg(id, rank+1)) }, 'Good'),
      button({ className: 'f4 ph3 pv2 bg-dark-green bn white br1', onclick: () => dispatch(updateFlashcardRankMsg(id, rank+2)) }, 'Great')
    ])
  );
}

function deleteButton(dispatch, id) {
  return i({ className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer', onclick: () => dispatch(deleteFlashcardMsg(id))});
}

function flashcardDisplay(dispatch, question, answer, id, revealed, rank) {
  return [
    div([ div({className: 'b f6 mv1 underline'}, 'Question'),
          div({ className: 'pointer', onclick: () => dispatch(editFlashcardMsg(id)) }, question)
        ]),
    answerDisplay(dispatch, revealed, id, answer, rank),
    deleteButton(dispatch, id)
  ]
}

function flashcardField(inputLabel, oninput, input) {
  return div([
    div({className: 'b f6 mv1'}, inputLabel),
    textarea({ className: 'w-100 bg-washed-yellow outline-0', oninput }, input)
  ]);
}

function flashcardForm(dispatch, questionInput, answerInput, id) {
  return [
    flashcardField('Question', (e)=> dispatch(updateQuestionInputMsg(id, e.target.value)), questionInput),
    flashcardField('Answer', (e) => dispatch(updateAnswerInputMsg(id, e.target.value)), answerInput),
    button({ className: 'f4 ph3 pv2 br1 bg-gray bn white mv2', onclick: () => dispatch(saveFlashcardMsg(id)) }, 'Save'),
    deleteButton(dispatch, id)
  ]
}

const sortByRank = R.sortWith([
  R.ascend(R.prop('rank'))
]);

function flashcardSet(dispatch, flashcard) {
  const { question, answer, questionInput, answerInput, id, revealed, editing, rank } = flashcard;
  const display = editing ? flashcardForm(dispatch, questionInput, answerInput, id) : flashcardDisplay(dispatch, question, answer, id, revealed, rank);
  return div({
    className: 'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5'
  }, display)
}

function flashcardView(dispatch, flashcards) {
  if (flashcards.length === 0) return div({className: 'mv2 i black-50'}, 'No flashcards  to display...');
  return sortByRank(flashcards).map(flashcard => div({className: 'w-third pa2'}, flashcardSet(dispatch, flashcard)));
}


function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    div(formView(dispatch, model)),
    div({ className: 'flex flex-wrap nl2 nr2'}, flashcardView(dispatch, model.flashcards)),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
