let slide = `
<GridLayout id="vaccDose" row="0" rows="auto, *, *, *, *">
    <Label row="0" text="{{ vaccDoseQuery }}" fontSize="{{ mySize }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ vaccDoseAnswer0 }}" fontSize="{{ mySize }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ vaccDoseAnswer1 }}" fontSize="{{ mySize }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
    <Button row="4" id="2" text="{{ vaccDoseAnswer2 }}" fontSize="{{ mySize }}" class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
