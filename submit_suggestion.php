<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $suggestion = htmlspecialchars($_POST['suggestion']);

    // Sanitize inputs
    if (empty($name) || empty($suggestion)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    $suggestionData = [
        'name' => $name,
        'suggestion' => $suggestion,
        'timestamp' => date('Y-m-d H:i:s')
    ];

    $suggestionsFile = 'suggestions.json';

    // Load existing suggestions
    if (file_exists($suggestionsFile)) {
        $suggestions = json_decode(file_get_contents($suggestionsFile), true);
    } else {
        $suggestions = [];
    }

    // Append new suggestion
    $suggestions[] = $suggestionData;

    // Save updated suggestions
    if (file_put_contents($suggestionsFile, json_encode($suggestions, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'message' => 'Thank you for your suggestion!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save your suggestion. Please try again later.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
