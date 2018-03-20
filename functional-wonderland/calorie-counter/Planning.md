## Data Model

Example Model/Shape:

```javascript

meal = {
    id: 1,
    description: 'Breakfast',
    calories: 460
}

model = {
    meals: [],
    showForm: false, // toggles add meal form
    description: 'Dinner', // this record and the one below it hold the current form data
    calories: 600,
    editId: 3, // holds the id of the record to be edited, if any
    nextId: 1, // holds the next unique id to be assigned
}
```

## View Functions

view 
    formView
        fieldSet
        buttonSet
    tableView
        tableHeader (const)
        mealsBody
            mealRow
                cell
            totalRow

## Update Functions

What msg types will we need to dispatch? What kinds of interactions will we need to allow for?
- click add meal
- meal input
- calorie input
- click save -> Either adds a new meal, or updates a separate meal (these might be separate functions)
- click edit -> put app into edit mode
- click delete -> remove meal from the list

