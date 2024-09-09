'use client';

import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = ({ params }) => {
  const roomID = params.roomid;
  const meetingContainerRef = useRef(null); // Use ref to refer to the div container

  const myMeeting = async (element) => {
    try {
      // Fetch environment variables
      const appID = +process.env.NEXT_PUBLIC_APPID;
      const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET;

      // Generate kitToken
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        'jayesh'
      );

      // Log the kitToken and appID to ensure they are correct
      console.log('kitToken:', kitToken);
      console.log('appID:', appID);
      console.log('serverSecret:', serverSecret);

      if (!kitToken) {
        throw new Error('KitToken is undefined or invalid.');
      }

      // Create ZegoUIKitPrebuilt instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Log the zp object to ensure it is being created correctly
      console.log('ZegoUIKitPrebuilt instance:', zp);

      if (!zp || typeof zp.joinRoom !== 'function') {
        throw new Error('ZegoUIKitPrebuilt instance is invalid or missing joinRoom method.');
      }

      // Join the room
      zp.joinRoom({
        container: element, // Pass the DOM element from the ref
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol +
              '//' +
              window.location.host +
              window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // 1-on-1 call mode
        },
      });
    } catch (error) {
      console.error('Error initializing ZegoUIKitPrebuilt:', error.message);
    }
  };

  useEffect(() => {
    if (meetingContainerRef.current) {
      myMeeting(meetingContainerRef.current); // Pass the referenced div element to myMeeting
    }
  }, [roomID]);

  return (
    <div
      ref={meetingContainerRef}
      className="w-[100vw] h-[100vh]" 
    ></div>
  );
};

export default Room;
