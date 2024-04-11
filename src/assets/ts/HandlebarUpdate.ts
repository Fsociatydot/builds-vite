export default function HandlebarUpdate() {
  return {
    name: "HandlebarUpdate",
    enforce: "post",
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".hbs")) {
        console.log("reloading handlebar file...")
        server.ws.send({
          type: "full-reload",
          path: "*",
        })
      }
    },
  }
}
