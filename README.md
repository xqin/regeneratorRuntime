

POC for `ReferenceError: regeneratorRuntime is not defined`.

---


bad version: `@babel/runtime@7.18.0`  in `bad` branch.


good version: `@babel/runtime@7.17.9` in `good` branch.


```
rm -rf .next node_modules package-lock.json

npm i

npm run dev
```

http://127.0.0.1:3000/hello/world


