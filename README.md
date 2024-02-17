![The Holy Bible API](https://ik.imagekit.io/srichus/random-pics/bible-glow.gif?updatedAt=1708167707218)
# The Holy Bible API

### About
A typescript/class based api wrapper for 'https://bible-api.com/'. The API provides simple yet useful methods that can help developers fetch verses from the Holy Bible based on book names, chapter, verse as well as provide a translated version.
<br/><br/>

### Getting Started
- Download the NPM Package into your application folder
```console
foo@foobar-terminal~: npm install --save the-holy-bible-api
```
- Import the package in your respective file.
```javascript
import HolyBible from "the-holy-bible-api";
```
- Create a class instance in your file and then use a method to fetch a verse from the bible. Please note that you would need some function or wrapper that can handle async/await based requests from this API.
```javascript
import HolyBible from "the-holy-bible-api";

async function run() {
  const myBible = new HolyBible();
  const result = await myBible.fetchRandomVerse({});
  //... rest of your code
}
run();
```
<br/>

### Usage (Methods/API)
- ```fetchRandomVerse(arg): ``` will help to fetch a single random verse from the bible api endpoint. Accepts one argument that takes the following shape:
```javascript
/*
arg: {
  langId?: string // optional param - check 'https://bible-api.com/' translation section for the 'identifiers'
}
*/

const myBible = new HolyBible();
const result = await myBible.fetchRandomVerse({langId: "bkr"});
```
- ```fetchASingleVerse(arg):``` will help to fetch a single verse, this will be based on the type of input that the method recieves. Accepts one argument that takes the following shape:
```javascript
/*
arg: {
  langId?: string // optional param - check 'https://bible-api.com/' translation section for the 'identifiers'
  name: string // (required): name of the book like "Isaiah" or "Ezekiel" or "Esther",
  chapter: number // (required): chapter number
  verse: number // (required): verse number
}
*/

const myBible = new HolyBible();
const props = {
  langId: "web",
  name: "Ezekiel",
  chapter: 1,
  verse: 3
};
const result = await myBible.fetchASingleVerse(props);
```
- ```fetchChapterVersesByRange(arg):``` will help return a set of verses, based on the chapter given. Accepts one argument that takes the following shape:
```javascript
/*
arg: {
  langId?: string // optional param - check 'https://bible-api.com/' translation section for the 'identifiers'
  name: string // (required): name of the book like "Isaiah" or "Ezekiel" or "Esther",
  chapter: number // (required): chapter number
  start: number // (required): the starting point verse
  end: number // (required): the ending point verse
}
*/

const myBible = new HolyBible();
const props = {
  langId: "web",
  name: "Ezekiel",
  chapter: 1,
  start: 3,
  end: 5
};
const result = await myBible.fetchChapterVersesByRange(props);
```
- ```fetchChapterVersesByMultiRange(arg):``` will help fetch multiple verses from multiple chapters. Accepts one argument that takes the following shape:
```javascript
arg: {
  langId?: string // optional param - check 'https://bible-api.com/' translation section for the 'identifiers'
  name: string // (required): name of the book like "Isaiah" or "Ezekiel" or "Esther",
  range: Array<{chapter: number, verses: string[]}>
}

const myBible = new HolyBible();
const props = {
  langId: "web",
  name: "Ezekiel",
  range: [
    {chapter: 1, verses: ["1-3", "4"]},
    {chapter: 2, verses: ["1", "2", "5-7"]}
    ...etc
  ]
};
const result = await myBible.fetchChapterVersesByMultiRange(props);
```
- ```fetchSystemHelp():``` will provide information about this API package. It will also list all the Identifiers from the translation section as well which you can use in your project.
```javascript
const myBible = new HolyBible();
const result = myBible.fetchSystemHelp() // this is a regular sync method
```
<br/>

### Test Coverage
```console
-----------------------------------|---------|----------|---------|---------|----------------------
File                               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s    
-----------------------------------|---------|----------|---------|---------|----------------------
All files                          |   79.79 |       50 |   90.47 |   79.79 |                      
 src                               |   86.95 |    54.54 |   85.71 |   86.95 |                      
  index.ts                         |   86.95 |    54.54 |   85.71 |   86.95 | 58,72,90,111,130-138 
 src/service/fetch-single-verse    |   73.33 |       50 |     100 |   73.33 |                      
  index.ts                         |   73.33 |       50 |     100 |   73.33 | 41-42,47,54          
 src/service/fetch-verses-by-range |   78.94 |       50 |     100 |   78.94 |                      
  index.ts                         |   78.94 |       50 |     100 |   78.94 | 50-51,56,63          
 src/service/help                  |   33.33 |      100 |       0 |   33.33 |                      
  index.ts                         |   33.33 |      100 |       0 |   33.33 | 3-84                 
 src/service/random-verse          |      75 |       40 |     100 |      75 |                      
  index.ts                         |      75 |       40 |     100 |      75 | 19-20,49,56          
-----------------------------------|---------|----------|---------|---------|----------------------
Test Suites: 4 passed, 4 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        5.308 s
Ran all test suites.
```
<br/>

### Contributions
Do you have an idea? May be you wish to add another method to this existing library? Or perhaps you've found a bug? Please feel free to raise a github issue and I would resolve it at the earliest possible.
<br/>

### Support
If you like this project, I would really appreciate you placing a star on the github project. This would really help encourage me to become a better developer. Speak to your friends and colleagues about this project too if you can and seek their support. Here is wishing you a nice day and happy coding. Cheers!
