<style>
  .blue { color: #1589F0; }
  .red { color: #f03c15; }
  .yellow { color: #e3b312; }
  .font {font-size: 16px;}
  .pink {color: #FF69B4;}
  .green {color: #00ff6a;}
  .dYellow {color: #ffee00;}
  .sblue {color: #03fcd7;}
  .weight {font-weight: 700;}
</style>

<!-- red for pitfall from react docs -->

# React

## ©️ Components: UI building blocks

-   React lets you combine your markup, CSS, and JavaScript into custom “components”, reusable UI elements for your app.

-   A React component is a JavaScript function that you can sprinkle with markup.

```jsx
export default function Profile() {
    return (
        <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
    );
}
```

-   React components are regular JavaScript functions, but their names must start with a capital letter or they won’t work!

-   The component returns an <img /> tag with src and alt attributes. <img /> is written like HTML, but it is actually JavaScript under the hood! This syntax is called `JSX`, and it lets you embed markup inside JavaScript.

-   Return statements can be written all on one line, as in this component:

```jsx
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

-   But if your markup isn’t all on the same line as the return keyword, you must wrap it in a pair of parentheses:

```jsx
return (
    <div>
        <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
    </div>
);
```

-   <span class="red">Without parentheses, any code on the lines after return will be ignored! </span>

### Using component

-   Now that you’ve defined your Profile component, you can nest it inside other components. For example, you can export a Gallery component that uses multiple Profile components:

```jsx
function Profile() {
    return (
        <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
    );
}

export default function Gallery() {
    return (
        <section>
            <h1>Amazing scientists</h1>
            <Profile />
            <Profile />
            <Profile />
        </section>
    );
}
```

-   What the browser sees

    -   Notice the difference in casing:
    -   `<section>` is lowercase, so React knows we refer to an HTML tag.
    -   `<Profile />` starts with a capital P, so React knows that we want to use our component called Profile.

-   And Profile contains even more HTML: <img />. In the end, this is what the browser sees:

```html
<section>
    <h1>Amazing scientists</h1>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

-   <span class="dYellow"> Because the Profile components are rendered inside Gallery—even several times!—we can say that Gallery is a parent component, rendering each Profile as a “child”. This is part of the magic of React: you can define a component once, and then use it in as many places and as many times as you like. </span>

-   <span class="red"> Components can render other components, but you must never nest their definitions: </span>

```jsx
export default function Gallery() {
    // 🔴 Never define a component inside another component!
    function Profile() {
        // ...
    }
    // ...
}
```

-   <span class="red"> The snippet above is very slow and causes bugs. Instead, define every component at the top level: </span>

```jsx
export default function Gallery() {
    // ...
}

// ✅ Declare components at the top level
function Profile() {
    // ...
}
```

-   When a child component needs some data from a parent, pass it by props instead of nesting definitions.

---

## 🌝 Importing and Exporting Components

-   A file can only have one default export, but it can have numerous named exports!

-   default export means in a file there is only one default export function and while importing you can give any name you want to the function

-   default export

```jsx
// file name Button.jsx
export default function Button() {}
```

-   default import

```jsx
// file name Gallery.jsx
import Bunnana from "./Button.jsx";
```

-   named export means in a file there may be more then one export function so you can export them normally using `export` keyword and while importing we have to use the name of function that we exported.

```jsx
export function Button() {}
//or

export { Button, Profile, Gallery }; //here just give the refrence to the function don't call it.
```

```jsx
import { Button } from "./Button.jsx";
```

## 🌚 Writing Markup with JSX

-   JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.

-   JSX and React are two separate things. They’re often used together, but you can use them independently of each other. JSX is a syntax extension, while React is a JavaScript library.

### The Rules of JSX

1.  Return a single root element

    -   To return multiple elements from a component, wrap them with a single parent tag.

    -   For example, you can use a `<div>`:

        ```jsx
            <div>
            <h1>Hedy Lamarr's Todos</h1>
            <img
            src="https://i.imgur.com/yXOvdOSs.jpg"
            alt="Hedy Lamarr"
            class="photo"
            >
            <ul>
            ...
            </ul>
            </div>

        ```

    -   If you don’t want to add an extra `<div>` to your markup, you can write <> and </> instead:

    -   This empty tag is called a `Fragment`. Fragments let you group things without leaving any trace in the browser HTML tree

-   Why do multiple JSX tags need to be wrapped?
    -   Ans: JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.

2. Close all the tags

    - JSX requires tags to be explicitly closed: self-closing tags like` <img>` must become `<img />`, and wrapping tags like` <li>`oranges must be written as `<li>`oranges`</li>`.

3. camelCase all most of the things!

    - JSX turns into JavaScript and attributes written in JSX become keys of JavaScript objects. In your own components, you will often want to read those attributes into variables. But JavaScript has limitations on variable names. For example, their names can’t contain dashes or be reserved words like class.

    - This is why, in React, many HTML and SVG attributes are written in camelCase. For example, instead of stroke-width you use strokeWidth. Since class is a reserved word, in React you write className instead, named after the corresponding DOM property:

---

## 👩‍🦱 JavaScript in JSX with Curly Braces

-   Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to open a window to JavaScript.

-   Passing strings with quotes

```jsx
export default function Avatar() {
    const avatar = "https://i.imgur.com/7vQD0fPs.jpg";
    const description = "Gregorio Y. Zara";
    return <img className="avatar" src={avatar} alt={description} />;
}
```

-   Any JavaScript expression will work between curly braces, including function calls like formatDate():

```jsx
const today = new Date();

function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export default function TodoList() {
    return <h1>To Do List for {formatDate(today)}</h1>;
}
```

### Where to use curly braces

-   You can only use curly braces in two ways inside JSX:

    1. As text directly inside a JSX tag: `<h1>`{name}'s To Do List`</h1>` works, but <{tag}>Gregorio Y. Zara's To Do List</{tag}> will not.

    2. As attributes immediately following the = sign: src={avatar} will read the avatar variable, but src="{avatar}" will pass the string "{avatar}".

### Using “double curlies”: CSS and other objects in JSX

-   In addition to strings, numbers, and other JavaScript expressions, you can even pass objects in JSX. Objects are also denoted with curly braces, like { name: "Hedy Lamarr", inventions: 5 }. Therefore, to pass a JS object in JSX, you must wrap the object in another pair of curly braces: person={{ name: "Hedy Lamarr", inventions: 5 }}.

-   You may see this with inline CSS styles in JSX. React does not require you to use inline styles (CSS classes work great for most cases). But when you need an inline style, you pass an object to the style attribute:

```jsx
export default function TodoList() {
    return (
        <ul
            style={{
                backgroundColor: "black",
                color: "pink",
            }}
        >
            <li>Improve the videophone</li>
            <li>Prepare aeronautics lectures</li>
            <li>Work on the alcohol-fuelled engine</li>
        </ul>
    );
}
```

---

## 🔅 Passing Props to a Component

-   <span class="green"> React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions. </span>

### Step 1: Pass props to the child component

-   First, pass some props to Avatar. For example, let’s pass two props: person (an object), and size (a number):

```jsx
export default function Profile() {
    return (
        <Avatar
            person={{ name: "Lin Lanying", imageId: "1bX5QH6" }}
            size={100}
        />
    );
}
```

-   <span class="blue"> If double curly braces after person= confuse you, recall they’re merely an `object` inside the JSX curlies. </span>

### Step 2: Read props inside the child component

-   You can read these props by listing their names person, size separated by the commas inside ({ and }) directly after function Avatar. This lets you use them inside the Avatar code, like you would with a variable.

```jsx
function Avatar({ person, size }) {
    // person and size are available here
}
```

-   Add some logic to Avatar that uses the person and size props for rendering, and you’re done.

-   Props let you think about parent and child components independently. For example, you can change the person or the size props inside Profile without having to think about how Avatar uses them. Similarly, you can change how the Avatar uses these props, without looking at the Profile.

-   You can think of props like “knobs” that you can adjust. They serve the same role as arguments serve for functions—in fact, props are the only argument to your component! React component functions accept a single argument, a `props` object:

```jsx
function Avatar(props) {
    let person = props.person;
    let size = props.size;
    // ...
}
```

-   <span class="dYellow"> Usually you don’t need the whole props object itself, so you destructure it into individual props. </span>

    -   Don’t miss the pair of `{ and }` curlies inside of `( and )` when declaring props:

    ```jsx
    function Avatar({ person, size }) {
        // ...
    }
    ```

    -   This syntax is called `“destructuring”` and is equivalent to reading properties from a function parameter:

    ```jsx
    function Avatar(props) {
        let person = props.person;
        let size = props.size;
        // ...
    }
    ```

### Specifying a default value for a prop

-   If you want to give a prop a default value to fall back on when no value is specified, you can do it with the destructuring by putting = and the default value right after the parameter:

```jsx
function Avatar({ person, size = 100 }) {
    // ...
}
```

-   The default value is only used if the size prop is missing or if you pass size={undefined}. But if you pass size={null} or size={0}, the default value will not be used.

### Forwarding props with the JSX spread syntax

-   Some time we get props from the parent component and we want to pass it into childe withou destructuring in that component so we take the whole props withou destructuring `{}` and pass all the props in child with `“spread”` syntax:

```jsx
function Profile(props) {
    return (
        <div className="card">
            <Avatar {...props} />
        </div>
    );
}
```

-   This forwards all of Profile’s props to the Avatar without listing each of their names.

-   Sometimes you’ll want to nest your own components the same way:

```jsx
<Card>
    <Avatar />
</Card>
```

-   component will receive that content in a prop called children. For example, the Card component below will receive a children prop set to <Avatar /> and render it in a wrapper div:

```jsx
import Avatar from "./Avatar.js";

function Card({ children }) {
    return <div className="card">{children}</div>;
}

export default function Profile() {
    return (
        <Card>
            <Avatar
                size={100}
                person={{
                    name: "Katsuko Saruhashi",
                    imageId: "YfeOqp2",
                }}
            />
        </Card>
    );
}
```

-   Try replacing the` <Avatar>` inside `<Card>` with some text to see how the Card component can wrap any nested content. It doesn’t need to “know” what’s being rendered inside of it. You will see this flexible pattern in many places.

-   You can think of a component with a children prop as having a “hole” that can be “filled in” by its parent components with arbitrary JSX. You will often use the children prop for visual wrappers: panels, grids, etc.

-   <span class="green"> However, props are immutable—a term from computer science meaning “unchangeable”. When a component needs to change its props (for example, in response to a user interaction or new data), it will have to “ask” its parent component to pass it different props—a new object! Its old props will then be cast aside, and eventually the JavaScript engine will reclaim the memory taken by them. </span>

---

## ⁉️ Conditional Rendering

-   Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if` statements, `&&`, and `? :` operators.

### Conditionally returning JSX

-   Let’s say you have a PackingList component rendering several Items, which can be marked as packed or not:

```jsx
function Item({ name, isPacked }) {
    if (isPacked) {
        return <li className="item">{name} ✅</li>;
    }
    return <li className="item">{name}</li>;
}

export default function PackingList() {
    return (
        <section>
            <h1>Sally Ride's Packing List</h1>
            <ul>
                <Item isPacked={true} name="Space suit" />
                <Item isPacked={true} name="Helmet with a golden leaf" />
                <Item isPacked={false} name="Photo of Tam" />
            </ul>
        </section>
    );
}
```

-   Notice how you’re creating branching logic with JavaScript’s if and return statements. In React, control flow (like conditions) is handled by JavaScript.

### Conditionally returning nothing with null

-   In some situations, you won’t want to render anything at all. For example, say you don’t want to show packed items at all. A component must return something. In this case, you can return null:

```jsx
if (isPacked) {
    return null;
}
return <li className="item">{name}</li>;
```

-   In practice, returning `null` from a component isn’t common because it might surprise a developer trying to render it. More often, you would conditionally include or exclude the component in the parent component’s JSX. Here’s how to do that!

### Conditional (ternary) operator (? :)

-   JavaScript has a compact syntax for writing a conditional expression — the conditional operator or “ternary operator”.

```jsx
return <li className="item">{isPacked ? name + " ✅" : name}</li>;
```

```jsx
function Item({ name, isPacked }) {
    return (
        <li className="item">{isPacked ? <del>{name + " ✅"}</del> : name}</li>
    );
}
```

---

## 🚂 Rendering Lists

-   You will often want to display multiple similar components from a collection of data. You can use the JavaScript array methods to manipulate an array of data. On this page, you’ll use filter() and map() with React to filter and transform your array of data into an array of components.

1. Move the data into an array:

```jsx
const people = [
    "Creola Katherine Johnson: mathematician",
    "Mario José Molina-Pasquel Henríquez: chemist",
    "Mohammad Abdus Salam: physicist",
    "Percy Lavon Julian: chemist",
    "Subrahmanyan Chandrasekhar: astrophysicist",
];
```

2. Map the people members into a new array of JSX nodes, listItems:

```jsx
const listItems = people.map((person) => <li>{person}</li>);
```

3. Return listItems from your component wrapped in a `<ul>`:

```jsx
return <ul>{listItems}</ul>;
```

-   full e.g:-

```jsx
const people = [
    "Creola Katherine Johnson: mathematician",
    "Mario José Molina-Pasquel Henríquez: chemist",
    "Mohammad Abdus Salam: physicist",
    "Percy Lavon Julian: chemist",
    "Subrahmanyan Chandrasekhar: astrophysicist",
];

export default function List() {
    const listItems = people.map((person) => <li>{person}</li>);
    return <ul>{listItems}</ul>;
}
```

### Filtering arrays of items

-   This data can be structured even more.

```jsx
const people = [
    {
        id: 0,
        name: "Creola Katherine Johnson",
        profession: "mathematician",
    },
    {
        id: 1,
        name: "Mario José Molina-Pasquel Henríquez",
        profession: "chemist",
    },
    {
        id: 2,
        name: "Mohammad Abdus Salam",
        profession: "physicist",
    },
    {
        id: 3,
        name: "Percy Lavon Julian",
        profession: "chemist",
    },
    {
        id: 4,
        name: "Subrahmanyan Chandrasekhar",
        profession: "astrophysicist",
    },
];
```

1. Create a new array of just `“chemist”` people, chemists, by calling filter() on the people filtering by person.profession === 'chemist':

```jsx
const chemists = people.filter((person) => person.profession === "chemist");
```

2. Now map over chemists:

```jsx
const listItems = chemists.map((person) => (
    <li>
        <img src={getImageUrl(person)} alt={person.name} />
        <p>
            <b>{person.name}:</b>
            {" " + person.profession + " "}
            known for {person.accomplishment}
        </p>
    </li>
));
```

3. Lastly, return the listItems from your component:

```jsx
return <ul>{listItems}</ul>;
```

-   full e.g:-

```jsx
import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

export default function List() {
    const chemists = people.filter((person) => person.profession === "chemist");
    const listItems = chemists.map((person) => (
        <li>
            <img src={getImageUrl(person)} alt={person.name} />
            <p>
                <b>{person.name}:</b>
                {" " + person.profession + " "}
                known for {person.accomplishment}
            </p>
        </li>
    ));
    return <ul>{listItems}</ul>;
}
```

-   <span class="red"> However, you must write return explicitly if your => is followed by a { curly brace! </span>

    ```jsx
    const listItems = chemists.map((person) => {
        // Curly brace
        return <li>...</li>;
    });
    ```

### Keeping list items in order with `key`

-   You need to give each array item a key — a string or a number that uniquely identifies it among other items in that array:

```jsx
<li key={person.id}>...</li>
```

-   <span class="dYellow"> Why does React need keys?</span>

    -   Imagine that files on your desktop didn’t have names. Instead, you’d refer to them by their order — the first file, the second file, and so on. You could get used to it, but once you delete a file, it would get confusing. The second file would become the first file, the third file would be the second file, and so on.

    -   File names in a folder and JSX keys in an array serve a similar purpose. They let us uniquely identify an item between its siblings. A well-chosen key provides more information than the position within the array. Even if the position changes due to reordering, the key lets React identify the item throughout its lifetime.

-   Where to get your key

    -   `Data from a database:` If your data is coming from a database, you can use the database keys/IDs, which are unique by nature.

    -   `Locally generated data:` If your data is generated and persisted locally (e.g. notes in a note-taking app), use an incrementing counter, crypto.randomUUID() or a package like uuid when creating items.

-   <span class="red"> You might be tempted to use an item’s index in the array as its key. In fact, that’s what React will use if you don’t specify a key at all. But the order in which you render items will change over time if an item is inserted, deleted, or if the array gets reordered. Index as a key often leads to subtle and confusing bugs. </span>

---

## 🌄 Responding to Events

-   React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on.

```jsx
export default function Button() {
    function handleClick() {
        alert("You clicked me!");
    }

    return <button onClick={handleClick}>Click me</button>;
}
```

-   By convention, it is common to name event handlers as handle followed by the event name. You’ll often see onClick={handleClick}, onMouseEnter={handleMouseEnter}, and so on.

-   Alternatively, you can define an event handler inline in the JSX:

```jsx
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

or

```jsx
<button onClick={() => {
  alert('You clicked me!');
}}>
```

-   <span class="red">Functions passed to event handlers must be passed, not called. For example: </span>

| passing a function (correct)      | calling a function (incorrect)     |
| --------------------------------- | ---------------------------------- |
| ` <button onClick={handleClick}>` | `<button onClick={handleClick()}>` |

-   The difference is subtle. In the first example, the `handleClick` function is passed as an onClick event handler. This tells React to remember it and only call your function when the user clicks the button.

-   In the second example, the () at the end of `handleClick()` fires the function immediately during rendering, without any clicks. This is because JavaScript inside the JSX { and } executes right away.

### Reading props in event handlers

-   Because event handlers are declared inside of a component, they have access to the component’s props. Here is a button that, when clicked, shows an alert with its message prop:

```jsx
function AlertButton({ message, children }) {
    return <button onClick={() => alert(message)}>{children}</button>;
}

export default function Toolbar() {
    return (
        <div>
            <AlertButton message="Playing!">Play Movie</AlertButton>
            <AlertButton message="Uploading!">Upload Image</AlertButton>
        </div>
    );
}
```

### Passing event handlers as props

-   Often you’ll want the parent component to specify a child’s event handler. Consider buttons: depending on where you’re using a Button component, you might want to execute a different function—perhaps one plays a movie and another uploads an image.

```jsx
function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}

function PlayButton({ movieName }) {
    function handlePlayClick() {
        alert(`Playing ${movieName}!`);
    }

    return <Button onClick={handlePlayClick}>Play "{movieName}"</Button>;
}

function UploadButton() {
    return <Button onClick={() => alert("Uploading!")}>Upload Image</Button>;
}

export default function Toolbar() {
    return (
        <div>
            <PlayButton movieName="Kiki's Delivery Service" />
            <UploadButton />
        </div>
    );
}
```

-   your Button component accepts a prop called onClick. It passes that prop directly to the built-in browser `<button>` with onClick=`{onClick}`. This tells React to call the passed function on click.

-   <span class="blue">If you use a design system, it’s common for components like buttons to contain styling but not specify behavior. Instead, components like PlayButton and UploadButton will pass event handlers down.</span>

### Naming event handler props

-   Built-in components like `<button>` and `<div>` only support browser event names like onClick. However, when you’re building your own components, you can name their event handler props any way that you like.

-   By convention, event handler props should start with `on`, followed by a capital letter

```jsx
export default function App() {
    return (
        <Toolbar
            onPlayMovie={() => alert("Playing!")}
            onUploadImage={() => alert("Uploading!")}
        />
    );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
    return (
        <div>
            <Button onClick={onPlayMovie}>Play Movie</Button>
            <Button onClick={onUploadImage}>Upload Image</Button>
        </div>
    );
}

function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}
```

### Event propagation

-   Event handlers will also catch events from any children your component might have. We say that an event “bubbles” or “propagates” up the tree: it starts with where the event happened, and then goes up the tree.

```jsx
export default function Toolbar() {
    return (
        <div
            className="Toolbar"
            onClick={() => {
                alert("You clicked on the toolbar!");
            }}
        >
            <button onClick={() => alert("Playing!")}>Play Movie</button>
            <button onClick={() => alert("Uploading!")}>Upload Image</button>
        </div>
    );
}
```

-   Here when click on any one btn so first it's own handler called and after that it's parent handler called

-   <span class="red"> All events propagate in React except onScroll, which only works on the JSX tag you attach it to. </span>

### Stopping propagation

-   Event handlers receive an event object as their only argument. By convention, it’s usually called e, which stands for “event”. You can use this object to read information about the event.

-   That event object also lets you stop the propagation. If you want to prevent an event from reaching parent components, you need to call e.stopPropagation() like this Button component does:

```jsx
function Button({ onClick, children }) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
        </button>
    );
}

export default function Toolbar() {
    return (
        <div
            className="Toolbar"
            onClick={() => {
                alert("You clicked on the toolbar!");
            }}
        >
            <Button onClick={() => alert("Playing!")}>Play Movie</Button>
            <Button onClick={() => alert("Uploading!")}>Upload Image</Button>
        </div>
    );
}
```

### Preventing default behavior

-   Some browser events have default behavior associated with them. For example, a `<form>` submit event, which happens when a button inside of it is clicked, will reload the whole page by default:

```jsx
export default function Signup() {
    return (
        <form onSubmit={() => alert("Submitting!")}>
            <input />
            <button>Send</button>
        </form>
    );
}
```

-   You can call `e.preventDefault()` on the event object to stop this from happening:

```jsx
export default function Signup() {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                alert("Submitting!");
            }}
        >
            <input />
            <button>Send</button>
        </form>
    );
}
```

---

## 📡 State: A Component's Memory

-   <span class="green"> Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” should put a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called state. </span>

### When a regular variable isn’t enough

-   Here’s a component that renders a sculpture image. Clicking the “Next” button should show the next sculpture by changing the index to 1, then 2, and so on. However, this won’t work

```jsx
import { sculptureList } from "./data.js";

export default function Gallery() {
    let index = 0;

    function handleClick() {
        index = index + 1;
    }

    let sculpture = sculptureList[index];
    return (
        <>
            <button onClick={handleClick}>Next</button>
            <h2>
                <i>{sculpture.name} </i>
                by {sculpture.artist}
            </h2>
            <h3>
                ({index + 1} of {sculptureList.length})
            </h3>
            <img src={sculpture.url} alt={sculpture.alt} />
            <p>{sculpture.description}</p>
        </>
    );
}
```

-   The handleClick event handler is updating a local variable, index. But two things prevent that change from being visible:

1. Local variables don’t persist between renders. When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.

2. Changes to local variables won’t trigger renders. React doesn’t realize it needs to render the component again with the new data.

-   <span class="yellow"> To update a component with new data, two things need to happen: </span>

1. Retain the data between renders.

2. Trigger React to render the component with new data (re-rendering).

-   <span class="font"><b>The `useState` Hook provides those two things:</b></span>

1. A state variable to retain the data between renders.

2. A state setter function to update the variable and trigger React to render the component again.

### Adding a state variable

-   To add a state variable, import useState from React at the top of the file:

```jsx
import { useState } from "react";
```

```jsx
const [index, setIndex] = useState(0);
```

-   index is a state variable and setIndex is the setter function.

-   <span class="blue"> <b> The `[ and ]` syntax here is called array destructuring and it lets you read values from an array. The array returned by useState always has exactly two items. </b> </span>

```jsx
import { useState } from "react";
import { sculptureList } from "./data.js";

export default function Gallery() {
    const [index, setIndex] = useState(0);

    function handleClick() {
        setIndex(index + 1);
    }

    let sculpture = sculptureList[index];
    return (
        <>
            <button onClick={handleClick}>Next</button>
            <h2>
                <i>{sculpture.name} </i>
                by {sculpture.artist}
            </h2>
            <h3>
                ({index + 1} of {sculptureList.length})
            </h3>
            <img src={sculpture.url} alt={sculpture.alt} />
            <p>{sculpture.description}</p>
        </>
    );
}
```

### Meet your first Hook

-   In React, useState, as well as any other function starting with “use”, is called a Hook.

-   Hooks are special functions that are only available while React is rendering. They let you “hook into” different React features.

-   <span class="red"> Hooks—functions starting with use—can only be called at the top level of your components or `your own Hooks`. You can’t call Hooks inside conditions, loops, or other nested functions. Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs. You “use” React features at the top of your component similar to how you “import” modules at the top of your file. </span>

### Anatomy of useState

-   When you call useState, you are telling React that you want this component to remember something:

```jsx
const [index, setIndex] = useState(0);
```

-   In this case, you want React to remember index.

-   <span class="blue"> The convention is to name this pair like `const [something, setSomething]`. You could name it anything you like, but conventions make things easier to understand across projects. </span>

-   The only argument to `useState` is the initial value of your state variable. In this example, the index’s initial value is set to 0 with `useState(0)`.

-   Every time your component renders, useState gives you an array containing two values:

1. The state variable (index) with the value you stored.

2. The state setter function (setIndex) which can update the state variable and trigger React to render the component again.

---

## 🍀 Synchronizing with Effects

-   Some components need to synchronize with external systems. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.

### What are Effects and how are they different from events?

-   Rendering code (introduced in Describing the UI) lives at the top level of your component. This is where you take the props and state, transform them, and return the JSX you want to see on the screen. Rendering code must be pure. Like a math formula, it should only calculate the result, but not do anything else.

-   Event handlers (introduced in Adding Interactivity) are nested functions inside your components that do things rather than just calculate them. An event handler might update an input field, submit an HTTP POST request to buy a product, or navigate the user to another screen. Event handlers contain “side effects” (they change the program’s state) caused by a specific user action (for example, a button click or typing).

-   <span class="green"> Sometimes this isn’t enough. Consider a ChatRoom component that must connect to the chat server whenever it’s visible on the screen. Connecting to a server is not a pure calculation (it’s a side effect) so it can’t happen during rendering. However, there is no single particular event like a click that causes ChatRoom to be displayed. </span>

-   <span class="dYellow"> Effects let you specify side effects that are caused by rendering itself, rather than by a particular event. Sending a message in the chat is an event because it is directly caused by the user clicking a specific button. However, setting up a server connection is an Effect because it should happen no matter which interaction caused the component to appear. Effects run at the end of a commit after the screen updates. This is a good time to synchronize the React components with some external system (like network or a third-party library). </span>

### You might not need an Effect

-   Don’t rush to add Effects to your components. Keep in mind that Effects are typically used to “step out” of your React code and synchronize with some external system. This includes browser APIs, third-party widgets, network, and so on. If your Effect only adjusts some state based on other state, you might not need an Effect.

### How to write an Effect

1. Declare an Effect. By default, your Effect will run after every commit.

2. Specify the Effect dependencies. Most Effects should only re-run when needed rather than after every render. For example, a fade-in animation should only trigger when a component appears. Connecting and disconnecting to a chat room should only happen when the component appears and disappears, or when the chat room changes. You will learn how to control this by specifying dependencies.

3. Add cleanup if needed. Some Effects need to specify how to stop, undo, or clean up whatever they were doing. For example, “connect” needs “disconnect”, “subscribe” needs “unsubscribe”, and “fetch” needs either “cancel” or “ignore”. You will learn how to do this by returning a cleanup function.

### Step 1: Declare an Effect

-   To declare an Effect in your component, import the useEffect Hook from React:

```jsx
import { useEffect } from "react";
```

-   Then, call it at the top level of your component and put some code inside your Effect:

```jsx
function MyComponent() {
    useEffect(() => {
        // Code here will run after *every* render
    });
    return <div />;
}
```

-   <span class="green"> Every time your component renders, React will update the screen and then run the code inside useEffect. In other words, useEffect “delays” a piece of code from running until that render is reflected on the screen. </span>

-   Let’s see how you can use an Effect to synchronize with an external system. Consider a <VideoPlayer> React component. It would be nice to control whether it’s playing or paused by passing an isPlaying prop to it:

```jsx
<VideoPlayer isPlaying={isPlaying} />
```

Your custom VideoPlayer component renders the built-in browser `<video>` tag:

```jsx
function VideoPlayer({ src, isPlaying }) {
    // TODO: do something with isPlaying
    return <video src={src} />;
}
```

-   However, the browser `<video>` tag does not have an isPlaying prop. The only way to control it is to manually call the play() and pause() methods on the DOM element. You need to synchronize the value of isPlaying prop, which tells whether the video should currently be playing, with calls like play() and pause().

-   We’ll need to first get a ref to the `<video>` DOM node.

```jsx
import { useState, useRef, useEffect } from "react";

function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null);

    if (isPlaying) {
        ref.current.play();
    } else {
        ref.current.pause();
    }

    return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <VideoPlayer
                isPlaying={isPlaying}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
        </>
    );
}
```

-   Here this code fails because react try to do something with DOM the `video` tag but until you return any jsx the react will not create the DOM so react don't know what DOM nodes to create and you try to update DOM with `play() and pause()` browser Media API. so it will not render the screen;

-   Solution: wrap it in Effect:-

```jsx
import { useState, useRef, useEffect } from "react";

function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    });

    return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <VideoPlayer
                isPlaying={isPlaying}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
        </>
    );
}
```

-   Now Effect will run after the render so first react will render you jsx code on the screen and then it will call the Effect based on the props `isPlaying`.

-   <span class="blue"> In this example, the `“external system”` you synchronized to React state was the browser media API. You can use a similar approach to wrap legacy non-React code (like jQuery plugins) into declarative React components. </span>

-   <span class="red"> By default, Effects run after every render. This is why code like this will produce an infinite loop: </span>

```jsx
const [count, setCount] = useState(0);
useEffect(() => {
    setCount(count + 1);
});
```

-   <span class="red"> Effects run as a result of rendering. Setting state triggers rendering. Setting state immediately in an Effect is like plugging a power outlet into itself. The Effect runs, it sets the state, which causes a re-render, which causes the Effect to run, it sets the state again, this causes another re-render, and so on. </span >

-   <span class="pink">Effects should usually synchronize your components with an external system. If there’s no external system and you only want to adjust some state based on other state, you might not need an Effect. </span>

### Step 2: Specify the Effect dependencies

-   By default, Effects run after every render. Often, this is not what you want:

-   Sometimes, it’s slow. Synchronizing with an external system is not always instant, so you might want to skip doing it unless it’s necessary. For example, you don’t want to reconnect to the chat server on every keystroke.

-   Sometimes, it’s wrong. For example, you don’t want to trigger a component fade-in animation on every keystroke. The animation should only play once when the component appears for the first time.

-   To demonstrate the issue, here is the previous example with a few console.log calls and a text input that updates the parent component’s state. Notice how typing causes the Effect to re-run:

```jsx
import { useState, useRef, useEffect } from "react";

function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            console.log("Calling video.play()");
            ref.current.play();
        } else {
            console.log("Calling video.pause()");
            ref.current.pause();
        }
    });

    return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [text, setText] = useState("");
    return (
        <>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <VideoPlayer
                isPlaying={isPlaying}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
        </>
    );
}
```

-   You can tell React to skip unnecessarily re-running the Effect by specifying an array of dependencies as the second argument to the useEffect call. Start by adding an empty [] array to the above example.

```jsx
useEffect(() => {
    if (isPlaying) {
        // It's used here...
        // ...
    } else {
        // ...
    }
}, [isPlaying]); // ...so it must be declared here!
```

-   Now all dependencies are declared, so there is no error. Specifying `[isPlaying]` as the dependency array tells React that it should skip re-running your Effect if isPlaying is the same as it was during the previous render. With this change, typing into the input doesn’t cause the Effect to re-run, but pressing Play/Pause does:

-   The dependency array can contain multiple dependencies. React will only skip re-running the Effect if all of the dependencies you specify have exactly the same values as they had during the previous render. React compares the dependency values using the Object.is comparison. See the useEffect reference for details.

-   <span class="red"> The behaviors without the dependency array and with an empty [] dependency array are different: </>

```jsx
useEffect(() => {
    // This runs after every render
});

useEffect(() => {
    // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
    // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```

### Step 3: Add cleanup if needed

-   Consider a different example. You’re writing a ChatRoom component that needs to connect to the chat server when it appears. You are given a `createConnection() API` that returns an object with `connect()` and `disconnect()` methods. How do you keep the component connected while it is displayed to the user?

-   Start by writing the Effect logic:

```jsx
useEffect(() => {
    const connection = createConnection();
    connection.connect();
});
```

-   It would be slow to connect to the chat after every re-render, so you add the dependency array:

```jsx
useEffect(() => {
    const connection = createConnection();
    connection.connect();
}, []);
```

-   The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

-   App.jsx

```jsx
import { useEffect } from "react";
import { createConnection } from "./chat.js";

export default function ChatRoom() {
    useEffect(() => {
        const connection = createConnection();
        connection.connect();
    }, []);
    return <h1>Welcome to the chat!</h1>;
}
```

-   chat.js

```jsx
export function createConnection() {
    // A real implementation would actually connect to the server
    return {
        connect() {
            console.log("✅ Connecting...");
        },
        disconnect() {
            console.log("❌ Disconnected.");
        },
    };
}
```

-   <span class="dYellow"> This Effect only runs on mount, so you might expect "✅ Connecting..." to be printed once in the console. However, if you check the console, "✅ Connecting..." gets printed twice. Why does it happen? </span>

-   Imagine the ChatRoom component is a part of a larger app with many different screens. The user starts their journey on the ChatRoom page. The component mounts and calls `connection.connect()`. Then imagine the user navigates to another screen—for example, to the Settings page. The ChatRoom component unmounts. Finally, the user clicks Back and ChatRoom mounts again. This would set up a second connection—but the first connection was never destroyed! As the user navigates across the app, the connections would keep piling up.

-   Bugs like this are easy to miss without extensive manual testing. To help you spot them quickly, `in development React remounts every component once immediately after its initial mount`.

-   Seeing the "✅ Connecting..." log twice helps you notice the real issue: your code doesn’t close the connection when the component unmounts.

-   To fix the issue, return a cleanup function from your Effect:

```jsx
useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
        connection.disconnect();
    };
}, []);
```

-   <span class="green"> React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed). Let’s see what happens when the cleanup function is implemented: </span>

- Now you get three console logs in development:

1. "✅ Connecting..."

2. "❌ Disconnected."

3. "✅ Connecting..."

- This is the correct behavior in development. By remounting your component, React verifies that navigating away and back would not break your code. Disconnecting and then connecting again is exactly what should happen! When you implement the cleanup well, there should be` no user-visible difference` between running the Effect once vs running it, cleaning it up, and running it again. There’s an extra connect/disconnect call pair because` React is probing your code for bugs in development.` This is normal—don’t try to make it go away!

- In production, you would only see "✅ Connecting..." printed once. `Remounting components only happens in development` to help you find `Effects that need cleanup`. You can `turn off Strict Mode` to opt out of the development behavior, but we `recommend keeping it on. This lets you find many bugs like the one above.`

### How to handle the Effect firing twice in development?

- <span class="green"> React intentionally remounts your components in development to find bugs like in the last example. The right question isn’t “how to run an Effect once”, but “how to fix my Effect so that it works after remounting”.  </span>

- Usually, the answer is to implement the cleanup function.  The cleanup function should stop or undo whatever the Effect was doing. The rule of thumb is that the user shouldn’t be able to distinguish between the Effect running once (as in production) and a setup → cleanup → setup sequence (as you’d see in development).


