"use strict"; // <-- see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

let pitchSequence = ['C', 'D', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// A function which returns the first pitch and rotates that pitch to the end of the sequence
function nextPitch() {
    let n = pitchSequence.shift()
    pitchSequence.push(n)
    return n
}

// A function to play a note
function playNote() {
    // Get the next pitch from the sequence
    let pitch = nextPitch()
    // Randomly choose the third or fourth octave
    let octave = Math.random() < 0.5 ? '3' : '4'
    // Create a synth and connect it to the destination
    const synth = new Tone.Synth().toDestination()
    // Trigger the note with an eighth note duration
    synth.triggerAttackRelease(pitch + octave, "8n")
}

// Get the button element from the document
let playButton = document.getElementById("play-button")
// Get the document body element from the document
let documentBody = document.body
// Define a variable to store the playing state
let isPlaying = false
// Define a variable to store the pause state
let isPaused = false
// Add an event listener to the document body element
documentBody.addEventListener("click", function(event) {
    // If the music is not paused and the target of the event is not the button, play a note
    if (!isPaused && event.target !== playButton) {
        playNote()
        isPlaying = true
    }
})
// Add an event listener to the button element
playButton.addEventListener("click", function() {
    // If the music is not paused, pause it
    if (!isPaused) {
        isPaused = true
        playButton.textContent = "Resume"
    }
    // If the music is paused, resume it
    else {
        isPaused = false
        playButton.textContent = "Pause"
    }
})

// Set the transport loop to true
Tone.Transport.loop = true


