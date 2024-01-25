import { createMachine, createActor, assign } from "xstate";

const textMachine = createMachine({
  context: {
    player: [],
    room1: [],
    room2: [],
    room3: [],
    room4: [],
    room5: [],
    room6: ["cup"],
  },
  initial: "room1",
  states: {
    room1: {
      on: {
        search: {
          actions: assign({
            player: ({ context }) => {
              let val = context.room1.pop();
              if (val) {
                context.player.push(val);
              }
              return context.player;
            },
          }),
        },
        right: { target: "room2" },
      },
    },
    room2: {
      on: {
        search: {
          actions: assign({
            player: ({ context }) => {
              let val = context.room2.pop();
              if (val) {
                context.player.push(val);
              }
              return context.player;
            },
          }),
        },
        right: { target: "room3" },
        left: { target: "room1" },
        up: { target: "room5" },
      },
    },
    room3: {
      on: {
        search: {
          actions: assign({
            player: ({ context }) => {
              let val = context.room3.pop();
              if (val) {
                context.player.push(val);
              }
              return context.player;
            },
          }),
        },
        left: { target: "room2" },
      },
    },
    room4: {
      on: {
        search: {
          actions: assign({
            player: ({ context }) => {
              let val = context.room4.pop();
              if (val) {
                context.player.push(val);
              }
              return context.player;
            },
          }),
        },
        right: { target: "room5" },
      },
    },
    room5: {
      on: {
        search: {
          actions: assign({
            player: ({ context }) => {
              let val = context.room5.pop();
              if (val) {
                context.player.push(val);
              }
              return context.player;
            },
          }),
        },
        right: { target: "room6" },
        left: { target: "room4" },
        down: { target: "room2" },
      },
    },
    room6: {
      on: {
        search: {
          actions: assign({
            player: ({ context }) => {
              let val = context.room6.pop();
              if (val) {
                context.player.push(val);
              }
              return context.player;
            },
          }),
        },
        left: { target: "room5" },
      },
    },
  },
});

const textActor = createActor(textMachine).start();

textActor.subscribe((state) => {
  document.getElementById('inventory').innerText = JSON.stringify(state.context.player);
  document.getElementById('room').innerText = JSON.stringify(state.value);
  document.getElementById('actions').innerText = JSON.stringify(Object.keys(state.machine.states[state.value].on));
});

textActor.send({ type: "start" });

function submit() {
    let input = document.getElementById('selection');

    textActor.send({ type: input.value });
    input.value = '';
}

window.submit = submit;