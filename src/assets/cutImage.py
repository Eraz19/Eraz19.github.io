from krita import *
import math

# Function to cut the image into 32 parts with equal width and create layers for each part
def cut_image_into_parts():
    # Get the active document
    activeDocument = Krita.instance().activeDocument()

    # Check if there is an active document
    if activeDocument:
        # Get the active node
        rootNode = activeDocument.rootNode()

        # Get the width and height of the image
        imageWidth = activeDocument.width()
        imageHeight = activeDocument.height()

        # Calculate the width of each part
        partWidth = imageWidth / 32

        # Loop through each part
        for i in range(32):
            # Calculate the starting and ending x positions for the current part
            startX = i * partWidth
            endX = startX + partWidth

            # Create a new layer for the current part
            partLayer = activeDocument.createNode("paintlayer", "Part " + str(i))
            partLayer.setPixelSize(imageWidth, imageHeight)

            # Set the selection to the current part
            selection = QRectF(startX, 0, partWidth, imageHeight)
            activeDocument.setSelection(selection)

            # Copy the content of the current part
            activeDocument.copy()

            # Paste the content into the new layer
            activeDocument.setCurrentNode(partLayer)
            activeDocument.paste()

            # Deselect the selection
            activeDocument.setSelection(QRectF())

            # Move the layer to the appropriate position
            partLayer.moveBy(i * partWidth, 0)

        # Update the view
        activeDocument.view().update()

# Run the function
cut_image_into_parts()
