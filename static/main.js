/**
 * Returns the current datetime for the message creation.
 */
function getCurrentTimestamp() {
    return new Date();
}

/**
 * Renders a message on the chat screen based on the given arguments.
 * This is called from the `showUserMessage` and `showBotMessage`.
 */
function renderMessageToScreen(args) {
    // local variables
    let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    let messagesContainer = $('.messages');

    // init element
    let message = $(`
    <li class="message ${args.message_side}">
        <div class="avatar"></div>
        <div class="text_wrapper">
            <div class="text">${args.text}</div>
            <div class="timestamp">${displayDate}</div>
        </div>
    </li>
    `);

    // add to parent
    messagesContainer.append(message);

    // animations
    requestAnimationFrame(function () {
        message.addClass('appeared');
    });
    messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

/* Sends a message when the 'Enter' key is pressed.
 */
$(document).ready(function() {
    $('#msg_input').keydown(function(e) {
        // Check for 'Enter' key
        if (e.key === 'Enter') {
            // Prevent default behaviour of enter key
            e.preventDefault();
            // Trigger send button click event
            $('#send_button').click();
        }
    });
});

/**
 * Displays the user message on the chat screen. This is the right side message.
 */
function showUserMessage(message, datetime) {
    if(message.trim() !== '') {
        renderMessageToScreen({
            text: message,
            time: datetime,
            message_side: 'right',
        });
    }
}

/**
 * Displays the chatbot message on the chat screen. This is the left side message.
 */
function showBotMessage(message, datetime) {
    if(message.trim() !== '') {
        renderMessageToScreen({
            text: message,
            time: datetime,
            message_side: 'left',
        });
    }
}

/**
 * Get input from user and show it on screen on button click.
 */
$('#send_button').on('click', function (e) {
    // get and show message and reset input
    let userMessage = $('#msg_input').val();
    if(userMessage.trim() !== '') {
        showUserMessage(userMessage);
        $('#msg_input').val('');

        // show bot message
        setTimeout(function () {
            showBotMessage(randomstring());
        }, 300);
    }
});

/**
 * Returns a random string. Just to specify bot message to the user.
 */
function randomstring(length = 20) {
    let output = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return output;
}

/**
 * Set initial bot message to the screen for the user.
 */
$(window).on('load', function () {
    showBotMessage('Hello there! Type in a message.');
});