# How to Start and Use This Website

Hi! This is Arbaj Ali's portfolio website. It's like a digital poster
that shows off his computer skills, with buttons you can click and games
you can play.

This guide will show you how to turn it on and what to do with it. No
computer expert stuff needed — just follow the steps in order.

## Before You Start

You need one helper program on your computer called **Node.js**. Think of
it like batteries — the website can't turn on without it.

1. Go to [nodejs.org](https://nodejs.org)
2. Click the big green download button
3. Open the file you downloaded and click "Next" a few times until it's
   installed

If you already have Node.js, you can skip this part.

## Turning the Website On

### Step 1: Open a Terminal

A terminal is a window where you type commands instead of clicking
buttons. It's how we "talk" to the computer.

- **On a Mac:** search for "Terminal" and open it
- **On Windows:** search for "Command Prompt" and open it

### Step 2: Go to the Website's Folder

Type this and press Enter:

```
cd arbaj-portfolio
```

Tip: if that doesn't work, drag the `arbaj-portfolio` folder into the
terminal window. It will type the correct path for you — then press
Enter.

### Step 3: Get the Building Blocks

Type this and press Enter:

```
npm install
```

This downloads all the small pieces the website is built from. It can
take a minute or two. That's normal — you only have to do this once.

### Step 4: Turn It On

Type this and press Enter:

```
npm run dev
```

Wait a few seconds. You'll see a message with a link that looks like
this:

```
Local:   http://localhost:5173/
```

### Step 5: Open It

Hold the Ctrl key (or Cmd on a Mac) and click that link. Or copy it and
paste it into your web browser (Chrome, Safari, Edge — any of them
work).

The website should now be open!

### Turning It Off

Click back into the terminal window and press `Ctrl + C`. That's the
"off switch."

To open the website again later, just repeat Step 1, 2 and 4 (you don't
need to do Step 3 again unless something changes).

## Things to Try on the Website

Once it's open, here's what you can play with:

- **Scroll down slowly.** Watch each section gently fade into view.
- **Click the glowing boxes** in the "System" section (the diagram with
  lines connecting boxes). A note underneath will explain what each box
  does.
- **Look at "Projects."** The big card is the flagship project, with a
  little request-flow diagram. Below it are cards for other finished
  freelance work.
- **Check "Current."** This shows anything being worked on right now. If
  it's empty, that's on purpose — it's a placeholder waiting for a real
  in-progress project to be added.
- **Click the cards** in the "Stack" section to see details about each
  skill.
- **Open your browser's console** (right-click the page → Inspect →
  Console tab) for a little hello message left for fellow developers.
- **Play the transaction game.** Scroll to "Simulate a transaction,"
  turn the switches on or off, then press "Send transaction" and watch
  the messages appear one by one.
- **Flip the light switch.** Click the little sun/moon button at the top
  to swap between dark mode and light mode.
- **Try it on a small screen.** Shrink your browser window (or open it
  on your phone) and click the three lines in the corner to open the
  menu.
- **Save the contact card.** In the "Connect" section, click "Save
  contact" to download a little file with the contact info in it.
- **Zoom back to the top.** Scroll down a bunch, then click the little
  arrow button that pops up in the bottom corner.

## If Something Doesn't Work

**It says "npm: command not found."**
Node.js isn't installed yet — go back to "Before You Start."

**The page in my browser is blank.**
Check the terminal — make sure it still says the website is running,
and that you copied the whole link correctly.

**I closed the terminal and now the website is gone.**
No problem! Open a new terminal and repeat Step 1, 2 and 4 above.

**Nothing happens when I type a command.**
Make sure you pressed the Enter key after typing it.

That's it — have fun exploring!
