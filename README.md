# Build and run
npm install

npm run build

node server.js

served at localhost:2000

user name: user
password: password

## Extra controls
1: 'h' and 'r' still work as expected, but you can also show/hide individual items by clicking the visibility icons beside the item name in the item list 

2: hovering over an item in the item list will turn everything execept that item transparent
(note due to depth buffer issues this 'kind of' works - you'll notice that if its behind a transparent item it won't fully show. if I had more time I'd render the item to a separate FBO and composit to overcome this)

3: hovering in the 3D view highlights that item in the item list


## Notes
had some fun with this, probably went overboard.

Please let me know when you have this so I can hide/remove the repo

I haven't made it particularly pretty, just bashed out the functionality.

I used node (express) for the server not because it's necessarily the best tool for the job (although it doesn't do too bad)
rather because my focus was on the react/redux front-end and express was the fastest for me. (I'm ok in python but its been a while)
Rather than serving up templated html I made hokey little rest-ish endpoints that return json (server converts csv)
this is so that developing new features in the front-end is easier, much easier to combine three.js and react that way.

The mesh data and the manifest.csv are not publicly served - this is private data hidden behind the server JWT authentication.

The Three.js viewer is hooked into the BimViewer component - calculations changed to be div rather than window based.

There could have been a much tidier integration between the redux dispatch calls and the material manipulation in threeJS,
If this were for real I'd have taken the time to think of a tidier way to do this - likely using redux middleware (thunk).

Redux contains all the meshData which makes it super easy to link react components with actions in the actual 3D view.
speedy development this way.

As far as style goes, I prefer function components and hooks to class-based components and make heavy use of map, reduce, filter, find etc. 
see csvToJsonArray in server.js as an example

Cheers,
Ben

