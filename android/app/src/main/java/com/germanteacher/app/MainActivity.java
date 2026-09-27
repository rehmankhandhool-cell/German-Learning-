package com.germanteacher.app;

import android.media.AudioManager;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(com.getcapacitor.community.tts.TextToSpeechPlugin.class);
        super.onCreate(savedInstanceState);
        try {
            // Set hardware volume controls to adjust music/media stream directly
            setVolumeControlStream(AudioManager.STREAM_MUSIC);

            WebView webView = getBridge().getWebView();
            if (webView != null) {
                WebSettings settings = webView.getSettings();
                // Allow audio/media playback to start cleanly without strict user-gesture barriers
                settings.setMediaPlaybackRequiresUserGesture(false);
                // Ensure JavaScript and DOM storage are fully enabled
                settings.setJavaScriptEnabled(true);
                settings.setDomStorageEnabled(true);
                settings.setDatabaseEnabled(true);
            }
        } catch (Exception e) {
            // ignore
        }
    }
}
