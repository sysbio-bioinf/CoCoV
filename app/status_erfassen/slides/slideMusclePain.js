let slide = `
<GridLayout id="musclePain" row="0" rows="auto, *, *, *, *, *, *" xmlns:ui="nativescript-auto-fit-text">
    <Label row="0" text="{{ musclePainQuery }}" fontSize="{{ mySize }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ musclePainAnswer0 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ musclePainAnswer1 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
    <Button row="4" id="2" text="{{ musclePainAnswer2 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
    <Button row="5" id="3" text="{{ musclePainAnswer3 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad3 my-button-grad3:active capitalization" tap="{{ switchTab }}" />
    <Button row="6" id="4" text="{{ musclePainAnswer4 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad4 my-button-grad4:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
