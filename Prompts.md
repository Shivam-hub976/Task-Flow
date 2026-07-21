1. Why do we have to use className instead of class when writing our HTML?
2. What exactly is a "Prop" and why did we pass task={task} down to <TaskCard/>?
3. What does "Lifting State Up" mean, and how does it relate to passing handleDeleteTask to the child component?
4. Why do we have to use .map() to display our tasks instead of a standard for loop?
5. Every time we use .map(), we add a key={task.id}. What happens if we forget to add that key?
6. Why can't we put all of our code in App.jsx? Why did we bother making a separate TaskCard.jsx file?
7. What does e.preventDefault() do when we submit the Add Task form?
8. What does import { useState } from 'react' actually do?
9. When we add a new task, we write setTasks([...tasks, newTask]). What do those three dots (...) do?
10. Why do we need a totally separate state variable (newTaskText) just to track what the user is typing in the input box?
11. How does tasks.filter(task => task.id !== taskId) successfully delete a task?
12. When creating a new task, we use id: Date.now(). Why do we use the current date and time as an ID?
13. How does the inline editing work? What is isEditing doing behind the scenes?
14. Why do we need both task.text and a separate editText state inside the TaskCard component?
15. What is useEffect doing, and why does it have [tasks] at the end of it?
16. Why do we have to wrap our tasks in JSON.stringify() before saving them?
17. When the page refreshes, why do we use JSON.parse() to get the data back?
18. Why did we use a callback function inside our initial useState to check localStorage?
19. If localStorage is empty (like the very first time someone visits the site), how does the app know to load the two default dummy tasks?
20. Where exactly does localStorage save this data on my computer?
21. If I open my Vercel link on my mobile phone, why are all my saved tasks missing?
22. Why did we install @hello-pangea/dnd instead of the react-beautiful-dnd library mentioned in the sprint instructions?
23. What is the difference between <DragDropContext>, <Droppable>, and <Draggable>?
24. What is provided.innerRef and why do we have to attach it to our <div> tags?
25. How does the onDragEnd function know which column I dropped the card into?
26. Why did we have to convert our IDs to strings using task.id.toString() inside the Drag component?
27. How did we make the column turn light blue (snapshot.isDraggingOver) when hovering a card over it?
28. Why was the search bar treating "hello" and "hello " (with a space) as two completely different searches?
29. How did adding .trim() fix the trailing space bug?
30. Why did we write a check to ensure newTaskText.trim() === '' instead of just letting users save empty tasks?
31. In the TaskCard, why did we use onBlur={handleSave}? What does onBlur mean?
32. Why did we add an onKeyDown event just to listen for the "Escape" and "Enter" keys during inline editing?
33. How does Tailwind make the columns responsive on mobile? What does md:grid-cols-3 actually mean?
34. How did we dynamically change the border color to Red, Yellow, or Green based on the task's priority?
35. Why did we add min-h-[250px] to the empty columns? (Hint: Think about what happens if you try to drag a card into a column with 0 height).
36. How did we add the Unsplash background image using inline styles while still using Tailwind for the overlay?
37. What does the group class do on the TaskCard, and how does it relate to the Delete button fading in on hover?
38. Why did we replace standard <div> tags with <main>, <section>, and <header>?
39. What is an aria-label and why did Lighthouse demand we add it to our inputs and buttons?
40. How were we able to generate a custom Favicon using inline SVG code instead of linking an actual .png file?
41. Why does Lighthouse penalize sites that don't have a <meta name="description"> tag in the index.html file?
42. What does <meta name="theme-color" content="#312e81"> do on mobile devices?
43. When we imported the project to Vercel, why didn't we have to configure any build commands? How did it know it was a Vite project?

---
