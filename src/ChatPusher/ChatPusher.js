import { Pusher } from '@pusher/pusher-websocket-react-native';

const apiKey = "99e5682af9c0307f7e5f"
const cluster = "ap2"

const pusher = Pusher.getInstance();

export async function initializePusher() {
    await pusher.init({
        apiKey: apiKey,
        cluster: cluster
    });
    await pusher.connect();
}

export function subscribeToChannel(channelName, onEventCallback) {
    pusher.subscribe({
        channelName: channelName,
        onEvent: (event) => {
            console.log("event==>>",event);
            onEventCallback && onEventCallback(event);
        }
    });
}

