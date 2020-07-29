from flask import Flask,render_template

app = Flask(__name__)
@app.route("/")
def home():
    return render_template("home.html")
@app.route("/Soft")
def Soft():
    return render_template("soft.html")
@app.route("/Metal")
def Metal():
    return render_template("metal.html")    
@app.route("/Rock")
def Rock():
    return render_template("rock.html")  
@app.route("/Pop")
def Pop():
    return render_template("pop.html")    
@app.route("/Caz")
def Caz():
    return render_template("caz.html")
@app.route("/Amateur")
def Amateur():
    return render_template("amateur.html")    
if(__name__ == "__main__"):
    app.run(debug = True)
