import customtkinter

customtkinter.set_default_color_theme("dark-blue")
customtkinter.set_appearance_mode("dark")
app = customtkinter.CTk()
app.geometry("600x500")
app.title("Password Manager")


def sayHello(data):
    print("Triggered")
    print(data.get())


frame = customtkinter.CTkFrame(master=app)
frame.pack(pady=20, padx=20, fill="both", expand=True)
label = customtkinter.CTkLabel(
    master=frame,
    text="Hello Guys",
    # text_font=("Roboto", 24)
)

entryBox1 = customtkinter.CTkEntry(master=frame, placeholder_text="Enter Your Name")

entryBox1.pack(pady=12, padx=10)
label.pack(pady=12, padx=10)

button = customtkinter.CTkButton(
    master=frame, text="Submit", text_color="#ffffff", command=sayHello(entryBox1)
)
button.pack(pady=12, padx=10)


app.mainloop()
